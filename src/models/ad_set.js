const mongoose = require("mongoose");

const Ad_setSchema = new mongoose.Schema(
    {
        ad_set_id: { type: String, required: true },
        campaign_id: { type: Schema.Types.ObjectId, ref: 'Campaign' },
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
        campaign: { type: String, required: false },
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
        pacing_type: { type: String, required: false },
        promoted_object: { type: String, required: false },
        recommendations: { type: String, required: false },
        recurring_budget_semantics: { type: String, required: false },
        review_feedback: { type: String, required: false },
        rf_prediction_id: { type: String, required: false },
        source_adset: { type: String, required: false },
        source_adset_id: { type: String, required: false },
        start_time: { type: String, required: false },
        status: { type: String, required: false },
        targeting: { type: String, required: false },
        targeting_optimization_types: { type: String, required: false },
        time_based_ad_rotation_id_blocks: { type: String, required: false },
        time_based_ad_rotation_intervals: { type: String, required: false },
        updated_time: { type: String, required: false },
        use_new_app_click: { type: String, required: false }
    },
    { timestamps: true }
)


const Ad_set = mongoose.model("Ad_set", Ad_setSchema);
module.exports = Ad_set;