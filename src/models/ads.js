const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const AdSchema = new mongoose.Schema(
    {
        // ad_account_id: { type: Schema.Types.ObjectId, ref: 'Facebook' },
        ad_set_id: { type: Schema.Types.ObjectId, ref: 'Ad_set' },
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
        // mobile_app_purchase_roas: { type: String, required: false },
        objective: { type: String, required: false },
        optimization_goal: { type: String, required: false },
        // outbound_clicks_ctr: { type: String, required: false },
        quality_ranking: { type: String, required: false },
        reach: { type: String, required: false },
        social_spend: { type: String, required: false },
        spend: { type: String, required: false },
        website_ctr: [{
            action_type: { type: String },
            value: { type: String }
        }],
        // website_purchase_roas: { type: String, required: false },
        account_id: { type: String, required: false },
        id: { type: String, required: false },
        name: { type: String, required: false },
        status: { type: String, required: false }

    },
    { timestamps: true }
)

const Ads = mongoose.model("Ads", AdSchema);
module.exports = Ads;