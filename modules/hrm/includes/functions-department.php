<?php

use WeDevs\ERP\HRM\Models\Department;
use WeDevs\ERP\HRM\Models\Employee;

/**
 * Create a new department
 *
 * @param  array   arguments
 *
 * @return int|false
 */
function erp_hr_create_department( $args = array() ) {

    $defaults = array(
        'id'          => 0,
        'title'       => '',
        'description' => '',
        'lead'        => 0,
        'parent'      => 0,
        'status'      => 1
    );

    $fields = wp_parse_args( $args, $defaults );

    // validation
    if ( empty( $fields['title'] ) ) {
        return new WP_Error( 'no-name', __( 'No department name provided.', 'erp' ) );
    }

    // unset the department id
    $dept_id = $fields['id'];
    unset( $fields['id'] );

    $department = new \WeDevs\ERP\HRM\Models\Department();

    if ( ! $dept_id ) {
        $dept = $department->create( $fields );

        do_action( 'erp_hr_dept_new', $dept->id, $fields );

        return $dept->id;

    } else {

        do_action( 'erp_hr_dept_before_updated', $dept_id, $fields );

        $department->find( $dept_id )->update( $fields );

        do_action( 'erp_hr_dept_after_updated', $dept_id, $fields );

        return $dept_id;
    }

    return false;
}

/**
 * Get all the departments of a company
 *
 * @param  int  the company id
 *
 * @return array  list of departments
 */
function erp_hr_get_departments( $args = [] ) {

    $defaults = array(
        'number'     => 20,
        'offset'     => 0,
        'orderby'    => 'id',
        'order'      => 'asc',
        'no_object'  => false
    );

    $args  = wp_parse_args( $args, $defaults );

    $cache_key = 'erp-get-departments';
    $results   = wp_cache_get( $cache_key, 'erp' );

    $department = new \WeDevs\ERP\HRM\Models\Department();

    if ( !empty( $args['s'] ) ) {

        if ( isset( $_GET['s'] ) ) {
            $s = sanitize_text_field( wp_unslash( $_GET['s'] ) ) ;
        } else {
            $s = sanitize_text_field( wp_unslash( $args['s'] ) ) ;
        }

        $results = $department
                ->where( 'title', 'LIKE', '%'. $s .'%' )
                ->get()
                ->toArray();
        $results = erp_array_to_object( $results );
    }

    if ( false === $results ) {
        $results = $department
                ->get()
                ->toArray();

        $results = erp_array_to_object( $results );
        wp_cache_set( $cache_key, $results, 'erp' );
    }

    $results = erp_parent_sort( $results );
    $departments = [];
    if ( $results ) {
        foreach ($results as $key => $row) {

            if ( true === $args['no_object'] ) {
                $departments[] = $row;
            } else {

                $departments[] = new WeDevs\ERP\HRM\Department( intval( $row->id ));
            }
        }
    }

    return $departments;
}

/**
 * Get all department from a company
 *
 * @param  int   $company_id  company id
 * @param bool $no_object     if set true, Department object will be
 *                            returned as array. $wpdb rows otherwise
 *
 * @return array  the department
 */
function erp_hr_count_departments() {
    return Department::count();
}

/**
 * Delete a department
 *
 * @param  int  department id
 *
 * @return bool
 */
function erp_hr_delete_department( $department_id ) {

    if ( is_array( $department_id ) ) {
        $exist_employee = [];
        $not_exist_employee = [];

        foreach ( $department_id as $key => $department ) {
            $dept = new Department( intval( $department ) );

            if ( $dept->num_of_employees() ) {
                $exist_employee[] = $department;
            } else {
                do_action( 'erp_hr_dept_delete', $dept );
                $not_exist_employee[] = $department;
            }
        }

        if ( $not_exist_employee ) {
            Department::destroy( $not_exist_employee );
        }

        return $exist_employee;

    }

    $department = new Department( intval( $department_id ) );

    if ( $department->num_of_employees() ) {
        return new WP_Error( 'not-empty', __( 'You can not delete this department because it contains employees.', 'erp' ) );
    }

    do_action( 'erp_hr_dept_delete', $department_id );

    $parent_id = Department::where( 'id', '=', $department_id )->pluck('parent')[0];

    if ( $parent_id ) {
        Department::where( 'parent', '=', $department_id )->update( ['parent' => $parent_id ] );
    } else {
        Department::where( 'parent', '=', $department_id )->update( ['parent' => 0 ] );
    }

    $resp = Department::find( $department_id )->delete();

    return $resp;
}

/**
 * Get the raw departments dropdown
 *
 * @param  int  company id
 * @param string  $select_label pass any string to be as the first element
 *
 * @return array  the key-value paired departments
 */
function erp_hr_get_departments_dropdown_raw( $select_label = null ) {
    $departments = erp_hr_get_departments();
    $dropdown    = array( '-1' => __( '- Select Department -', 'erp' ) );

    if ( $select_label ) {
        $dropdown    = array( '-1' => $select_label );
    }

    if ( $departments ) {
        foreach ($departments as $key => $department) {
            $dropdown[$department->id] = stripslashes( $department->title );
        }
    }

    return $dropdown;
}

/**
 * Get company departments dropdown
 *
 * @param  string  selected department
 *
 * @return string  the dropdown
 */
function erp_hr_get_departments_dropdown( $selected = '' ) {
    $departments = erp_hr_get_departments_dropdown_raw();
    $dropdown    = '';
    if ( $departments ) {
        foreach ($departments as $key => $title) {
            $dropdown .= sprintf( "<option value='%s'%s>%s</option>\n", $key, selected( $selected, $key, false ), $title );
        }
    }

    return $dropdown;
}

/**
 * Get employee's department lead by employee's user ID
 *
 * @param $user_id
 *
 * @return int
 */
function erp_hr_get_department_lead_by_user( $user_id ) {
    $employee = new \WeDevs\ERP\HRM\Employee( $user_id );

    if ( $employee->get_department() ) {
        $department = new Department( intval( $employee->get_department() ) );
        $department_lead = $department->get_lead();
    }

    return empty( $department_lead ) ? 0 : $department_lead->id;
}

/**
 * Get department employees
 * 
 * @since 1.5.15
 *
 * @param $lead_id
 *
 * @return array
 */
function erp_hr_get_dept_lead_subordinate_employees( $lead_id ) {

    $depts_id = Department::select('id')
            ->where('lead', absint( $lead_id ))->pluck('id')
            ->toArray();

    $users_id = Employee::select('user_id')
            ->whereIn('department', $depts_id )
            ->get()->toArray();

    return $users_id;
}

/**
 * Check if this user_id's department lead is the current logged_in user
 * 
 * @since 1.5.15
 * 
 * @return bool
 */
function erp_hr_match_user_dept_lead_with_current_user( $user_id ) {
    $employee = Employee::select('department')->where('user_id', $user_id )->first();
    $emp_department = absint( $employee->department );

    if ( $emp_department ) {
        $department = Department::find( $emp_department );

        if ( get_current_user_id() === absint( $department->lead ) ) {
            return true;
        }
    }

    return false;
}