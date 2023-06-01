const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema(
    {
        campaign_id: { type: String, required: true },
        user_id: { type: Schema.Types.ObjectId, ref: 'User' },
        ad_account_id: { type: Schema.Types.ObjectId, ref: 'Facebook' },
        account_id: { type: String, required: false },
        ad_strategy_group_id: { type: String, required: false },
        ad_strategy_id: { type: String, required: false },
        adlabels: { type: String, required: false },
        bid_strategy: { type: String, required: false },
        boosted_object_id: { type: String, required: false },
        brand_lift_studies: { type: String, required: false },
        budget_rebalance_flag: { type: String, required: false },
        budget_remaining: { type: String, required: false },
        buying_type: { type: String, required: false },
        can_create_brand_lift_study: { type: String, required: false },
        can_use_spend_cap: { type: String, required: false },
        configured_status: { type: String, required: false },
        created_time: { type: String, required: false },
        daily_budget: { type: String, required: false },
        effective_status: { type: String, required: false },
        has_secondary_skadnetwork_reporting: { type: String, required: false },
        id: { type: String, required: false },
        is_skadnetwork_attribution: { type: String, required: false },
        issues_info: { type: String, required: false },
        last_budget_toggling_time: { type: String, required: false },
        lifetime_budget: { type: String, required: false },
        name: { type: String, required: false },
        objective: { type: String, required: false },
        pacing_type: { type: String, required: false },
        primary_attribution: { type: String, required: false },
        promoted_object: { type: String, required: false },
        recommendations: { type: String, required: false },
        smart_promotion_type: { type: String, required: false },
        source_campaign: { type: String, required: false },
        source_campaign_id: { type: String, required: false },
        special_ad_categories: { type: String, required: false },
        special_ad_category: { type: String, required: false },
        special_ad_category_country: { type: String, required: false },
        spend_cap: { type: String, required: false },
        start_time: { type: String, required: false },
        status: { type: String, required: false },
        stop_time: { type: String, required: false },
        topline_id: { type: String, required: false },
        updated_time: { type: String, required: false }

    },
    { timestamps: true }
)

const Campaign = mongoose.model("Campaign", CampaignSchema);
module.exports = Campaign;