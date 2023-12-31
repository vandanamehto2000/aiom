const mongoose = require("mongoose");

const Ad_creativeSchema = new mongoose.Schema(
    {
        ad_creative_id: { type: String, required: true },
        ad_account_id: { type: Schema.Types.ObjectId, ref: 'Facebook' },
        account_id: { type: String, required: false },
        actor_id: { type: String, required: false },
        adlabels: { type: String, required: false },
        applink_treatment: { type: String, required: false },
        asset_feed_spec: { type: String, required: false },
        authorization_category: { type: String, required: false },
        auto_update: { type: String, required: false },
        body: { type: String, required: false },
        branded_content_sponsor_page_id: { type: String, required: false },
        bundle_folder_id: { type: String, required: false },
        call_to_action_type: { type: String, required: false },
        categorization_criteria: { type: String, required: false },
        category_media_source: { type: String, required: false },
        collaborative_ads_lsb_image_bank_id: { type: String, required: false },
        degrees_of_freedom_spec: { type: String, required: false },
        destination_set_id: { type: String, required: false },
        dynamic_ad_voice: { type: String, required: false },
        effective_authorization_category: { type: String, required: false },
        effective_instagram_media_id: { type: String, required: false },
        effective_instagram_story_id: { type: String, required: false },
        effective_object_story_id: { type: String, required: false },
        enable_direct_install: { type: String, required: false },
        enable_launch_instant_app: { type: String, required: false },
        id: { type: String, required: false },
        image_crops: { type: String, required: false },
        image_hash: { type: String, required: false },
        image_url: { type: String, required: false },
        instagram_actor_id: { type: String, required: false },
        instagram_permalink_url: { type: String, required: false },
        instagram_story_id: { type: String, required: false },
        instagram_user_id: { type: String, required: false },
        interactive_components_spec: { type: String, required: false },
        link_deep_link_url: { type: String, required: false },
        link_destination_display_url: { type: String, required: false },
        link_og_id: { type: String, required: false },
        link_url: { type: String, required: false },
        messenger_sponsored_message: { type: String, required: false },
        name: { type: String, required: false },
        object_id: { type: String, required: false },
        object_store_url: { type: String, required: false },
        object_story_id: { type: String, required: false },
        object_story_spec: { type: String, required: false },
        object_type: { type: String, required: false },
        object_url: { type: String, required: false },
        omnichannel_link_spec: { type: String, required: false },
        place_page_set_id: { type: String, required: false },
        platform_customizations: { type: String, required: false },
        playable_asset_id: { type: String, required: false },
        portrait_customizations: { type: String, required: false },
        product_set_id: { type: String, required: false },
        recommender_settings: { type: String, required: false },
        source_instagram_media_id: { type: String, required: false },
        status: { type: String, required: false },
        template_url: { type: String, required: false },
        template_url_spec: { type: String, required: false },
        thumbnail_id: { type: String, required: false },
        thumbnail_url: { type: String, required: false },
        title: { type: String, required: false },
        url_tags: { type: String, required: false },
        use_page_actor_override: { type: String, required: false },
        video_id: { type: String, required: false },
    },
    { timestamps: true }
)

const Ad_creative = mongoose.model("Ad_creative", Ad_creativeSchema);
module.exports = Ad_creative;