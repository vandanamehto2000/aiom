const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Ad_setSchema = new mongoose.Schema(
    {
        // ad_account_id: { type: Schema.Types.ObjectId, ref: 'Facebook' },
        campaign_id: { type: Schema.Types.ObjectId, ref: 'Campaign' },
        account_currency: { type: String, required: false },
        account_id: { type: String, required: false },
        account_name: { type: String, required: false },
        action_values: { type: String, required: false },
        actions: [{
            action_type: { type: String },
            value: { type: String }
        }],
        ad_id: { type: String, required: false },
        ad_name: { type: String, required: false },
        adset_id: { type: String, required: false },
        adset_name: { type: String, required: false },
        attribution_setting: { type: String, required: false },
        buying_type: { type: String, required: false },
        campaign_id: { type: String, required: false },
        campaign_name: { type: String, required: false },
        canvas_avg_view_percent: { type: String, required: false },
        canvas_avg_view_time: { type: String, required: false },
        catalog_segment_value: { type: String, required: false },
        clicks: { type: String, required: false },
        conversion_rate_ranking: { type: String, required: false },
        conversion_values: { type: String, required: false },
        conversions: { type: String, required: false },
        converted_product_quantity: { type: String, required: false },
        converted_product_value: { type: String, required: false },
        cost_per_action_type: [{
            action_type: { type: String },
            value: { type: String }
        }],
        cost_per_conversion: { type: String, required: false },
        cost_per_estimated_ad_recallers: { type: String, required: false },
        cost_per_inline_link_click: { type: String, required: false },
        cost_per_inline_post_engagement: { type: String, required: false },
        cost_per_outbound_click: { type: String, required: false },
        cost_per_thruplay: { type: String, required: false },
        cost_per_unique_action_type: [{
            action_type: { type: String },
            value: { type: String }
        }],
        cost_per_unique_click: { type: String, required: false },
        cost_per_unique_inline_link_click: { type: String, required: false },
        cost_per_unique_outbound_click: { type: String, required: false },
        cpc: { type: String, required: false },
        cpm: { type: String, required: false },
        cpp: { type: String, required: false },
        ctr: { type: String, required: false },
        date_start: { type: String, required: false },
        date_stop: { type: String, required: false },
        dda_results: { type: String, required: false },
        engagement_rate_ranking: { type: String, required: false },
        estimated_ad_recall_rate: { type: String, required: false },
        estimated_ad_recallers: { type: String, required: false },
        frequency: { type: String, required: false },
        impressions: { type: String, required: false },
        inline_link_click_ctr: { type: String, required: false },
        inline_link_clicks: { type: String, required: false },
        inline_post_engagement: { type: String, required: false },
        mobile_app_purchase_roas: { type: String, required: false },
        objective: { type: String, required: false },
        optimization_goal: { type: String, required: false },
        outbound_clicks_ctr: { type: String, required: false },
        quality_ranking: { type: String, required: false },
        reach: { type: String, required: false },
        social_spend: { type: String, required: false },
        spend: { type: String, required: false },
        website_ctr: [{
            action_type: { type: String },
            value: { type: String }
        }],
        website_purchase_roas: { type: String, required: false },
        account_id: { type: String, required: false },
        adlabels: { type: String, required: false },
        adset_schedule: { type: String, required: false },
        asset_feed_id: { type: String, required: false },
        attribution_spec: { type: String, required: false },
        bid_adjustments: { type: String, required: false },
        bid_amount: { type: String, required: false },
        bid_constraints: { type: String, required: false },
        bid_info: { type: String, required: false },
        bid_strategy: { type: String, required: false },
        billing_event: { type: String, required: false },
        budget_remaining: { type: String, required: false },
        campaign: { id: { type: String, required: false } },
        campaign_attribution: { type: String, required: false },
        campaign_id: { type: String, required: false },
        configured_status: { type: String, required: false },
        created_time: { type: String, required: false },
        creative_sequence: { type: String, required: false },
        daily_budget: { type: String, required: false },
        daily_min_spend_target: { type: String, required: false },
        daily_spend_cap: { type: String, required: false },
        destination_type: { type: String, required: false },
        effective_status: { type: String, required: false },
        end_time: { type: String, required: false },
        id: { type: String, required: false },
        instagram_actor_id: { type: String, required: false },
        is_dynamic_creative: { type: String, required: false },
        issues_info: { type: String, required: false },
        learning_stage_info: { type: String, required: false },
        lifetime_budget: { type: String, required: false },
        lifetime_imps: { type: String, required: false },
        lifetime_min_spend_target: { type: String, required: false },
        lifetime_spend_cap: { type: String, required: false },
        multi_optimization_goal_weight: { type: String, required: false },
        name: { type: String, required: false },
        optimization_goal: { type: String, required: false },
        optimization_sub_event: { type: String, required: false },
        pacing_type: [
            { type: String, required: false }
        ],
        promoted_object: { type: String, required: false },
        recommendations: { type: String, required: false },
        recurring_budget_semantics: { type: String, required: false },
        review_feedback: { type: String, required: false },
        rf_prediction_id: { type: String, required: false },
        source_adset: { type: String, required: false },
        source_adset_id: { type: String, required: false },
        start_time: { type: String, required: false },
        status: { type: String, required: false },
        targeting: {
            age_max: { type: String, required: false },
            age_min: { type: String, required: false },
            geo_locations: {
                countries: [
                    { type: String, required: false }
                ],
                location_types: [
                    { type: String, required: false }
                ]
            },
            facebook_positions: [
                { type: String, required: false }

            ]
        },
        targeting_optimization_types: [{
            key: { type: String },
            value: { type: String }
        }],
        time_based_ad_rotation_id_blocks: { type: String, required: false },
        time_based_ad_rotation_intervals: { type: String, required: false },
        updated_time: { type: String, required: false },
        use_new_app_click: { type: String, required: false },
        cpc: { type: String, required: false }

    },
    { timestamps: true }
)


const Ad_set = mongoose.model("Ad_set", Ad_setSchema);
module.exports = Ad_set;