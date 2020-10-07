<?php

namespace WeDevs\ERP\HRM\Update;

function erp_crm_alter_customer_activities_1_6_7() {
    global $wpdb;

    // Add title column in `erp_crm_customer_activities` table
    $table = $wpdb->prefix . 'erp_crm_customer_activities';
    $cols  = $wpdb->get_col( "DESC $table" );

    if ( ! in_array( 'title', $cols ) ) {
        $wpdb->query(
            "ALTER TABLE $table ADD `title` varchar(255) DEFAULT NULL AFTER `type`;"
        );
    }
}

erp_crm_alter_customer_activities_1_6_7();
