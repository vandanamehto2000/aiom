const insights_fields = 


["account_currency","account_id","account_name","action_values","actions","ad_id","ad_name","adset_id","adset_name","attribution_setting",
"buying_type","campaign_id","campaign_name","canvas_avg_view_percent","canvas_avg_view_time","catalog_segment_value","clicks",
"conversion_rate_ranking","conversion_values","conversions","converted_product_quantity","converted_product_value",
"cost_per_action_type","cost_per_conversion","cost_per_estimated_ad_recallers","cost_per_inline_link_click","cost_per_inline_post_engagement",
"cost_per_outbound_click","cost_per_thruplay","cost_per_unique_action_type","cost_per_unique_click","cost_per_unique_inline_link_click",
"cost_per_unique_outbound_click","cpc","cpm","cpp","ctr","date_start","date_stop","dda_results","engagement_rate_ranking","estimated_ad_recall_rate",
"estimated_ad_recallers","frequency","impressions","inline_link_click_ctr","inline_link_clicks","inline_post_engagement","mobile_app_purchase_roas",
"objective","optimization_goal","outbound_clicks_ctr","quality_ranking","reach","social_spend","spend","website_ctr","website_purchase_roas"]


const ad_set_fields = [
    "account_id","adlabels","adset_schedule","asset_feed_id","attribution_spec","bid_adjustments","bid_amount","bid_constraints","bid_info","bid_strategy","billing_event","budget_remaining","campaign","campaign_attribution","campaign_id","configured_status","created_time","creative_sequence","daily_budget","daily_min_spend_target","daily_spend_cap","destination_type","effective_status","end_time","id","instagram_actor_id","is_dynamic_creative","issues_info","learning_stage_info","lifetime_budget","lifetime_imps","lifetime_min_spend_target","lifetime_spend_cap","multi_optimization_goal_weight","name","optimization_goal","optimization_sub_event","pacing_type","promoted_object","recommendations","recurring_budget_semantics","review_feedback","rf_prediction_id","source_adset","source_adset_id","start_time","status","targeting","targeting_optimization_types","time_based_ad_rotation_id_blocks","time_based_ad_rotation_intervals","updated_time","use_new_app_click","cpc"
]

const ad_fields = [
    "account_currency",
      "account_id",
      "account_name",
      "action_values",
      "actions","ad_bid_value",
      "ad_click_actions",
      "ad_id",
      "ad_impression_actions",
      "ad_name",
      "adset_bid_value",
      "adset_end",
      "adset_id","adset_name",
      "adset_start",
      "age_targeting",
      "attribution_setting",
      "auction_bid",
      "auction_competitiveness",
      "auction_max_competitor_bid",
      "buying_type",
      "campaign_id",
      "campaign_name",
      "canvas_avg_view_percent",
      "canvas_avg_view_time",
      "catalog_segment_actions",
      "catalog_segment_value",
      "catalog_segment_value_mobile_purchase_roas",
      "catalog_segment_value_omni_purchase_roas",
      "catalog_segment_value_website_purchase_roas",
      "conversion_rate_ranking",
      "conversion_values",
      "converted_product_quantity",
      "converted_product_value",
      "cost_per_15_sec_video_view",
      "cost_per_2_sec_continuous_video_view",
      "cost_per_action_type",
      "cost_per_ad_click",
      "cost_per_conversion",
      "cost_per_dda_countby_convs",
      "cost_per_estimated_ad_recallers","cost_per_inline_link_click","cost_per_inline_post_engagement","cost_per_one_thousand_ad_impression","cost_per_outbound_click","cost_per_thruplay","cost_per_unique_action_type","cost_per_unique_click","cost_per_unique_conversion","cost_per_unique_inline_link_click","cost_per_unique_outbound_click","cpc","cpm","cpp","created_time","date_start","date_stop","dda_countby_convs","dda_results","engagement_rate_ranking","estimated_ad_recall_rate","estimated_ad_recall_rate_lower_bound","estimated_ad_recall_rate_upper_bound","estimated_ad_recallers","estimated_ad_recallers_lower_bound","estimated_ad_recallers_upper_bound","full_view_impressions","full_view_reach","gender_targeting","inline_link_click_ctr","inline_link_clicks","inline_post_engagement","instant_experience_clicks_to_open","instant_experience_clicks_to_start","instant_experience_outbound_clicks","interactive_component_tap","labels","location","mobile_app_purchase_roas","objective","optimization_goal","outbound_clicks","outbound_clicks_ctr","place_page_name","purchase_roas","qualifying_question_qualify_answer_rate","quality_ranking","quality_score_ectr","quality_score_ecvr","quality_score_organic","social_spend","spend","total_postbacks","total_postbacks_detailed","unique_actions","unique_clicks","unique_conversions","unique_ctr","unique_inline_link_click_ctr","unique_inline_link_clicks","unique_link_clicks_ctr","unique_outbound_clicks","unique_outbound_clicks_ctr","unique_video_continuous_2_sec_watched_actions","unique_video_view_15_sec","updated_time","video_15_sec_watched_actions","video_30_sec_watched_actions","video_avg_time_watched_actions","video_continuous_2_sec_watched_actions","video_p100_watched_actions","video_p25_watched_actions","video_p50_watched_actions","video_p75_watched_actions","video_p95_watched_actions","video_play_actions","video_play_curve_actions","video_play_retention_0_to_15s_actions","video_play_retention_20_to_60s_actions","video_play_retention_graph_actions","video_thruplay_watched_actions","video_time_watched_actions","website_ctr","website_purchase_roas","wish_bid",
    "account_id",
    "account_name",
    "action_values",
    "actions", "ad_bid_value",
    "ad_click_actions",
    "ad_id",
    "ad_impression_actions",
    "ad_name",
    "adset_bid_value",
    "adset_end",
    "adset_id", "adset_name",
    "adset_start",
    "age_targeting",
    "attribution_setting",
    "auction_bid",
    "auction_competitiveness",
    "auction_max_competitor_bid",
    "buying_type",
    "campaign_id",
    "campaign_name",
    "canvas_avg_view_percent",
    "canvas_avg_view_time",
    "catalog_segment_actions",
    "catalog_segment_value",
    "catalog_segment_value_mobile_purchase_roas",
    "catalog_segment_value_omni_purchase_roas",
    "catalog_segment_value_website_purchase_roas",
    "clicks",
    "conversion_rate_ranking",
    "conversion_values",
    "conversions",
    "converted_product_quantity",
    "converted_product_value",
    "cost_per_15_sec_video_view",
    "cost_per_2_sec_continuous_video_view",
    "cost_per_action_type",
    "cost_per_ad_click",
    "cost_per_conversion",
    "cost_per_dda_countby_convs",
    "cost_per_estimated_ad_recallers", "cost_per_inline_link_click", "cost_per_inline_post_engagement", "cost_per_one_thousand_ad_impression", "cost_per_outbound_click", "cost_per_thruplay", "cost_per_unique_action_type", "cost_per_unique_click", "cost_per_unique_conversion", "cost_per_unique_inline_link_click", "cost_per_unique_outbound_click", "cpc", "cpm", "cpp", "created_time", "ctr", "date_start", "date_stop", "dda_countby_convs", "dda_results", "engagement_rate_ranking", "estimated_ad_recall_rate", "estimated_ad_recall_rate_lower_bound", "estimated_ad_recall_rate_upper_bound", "estimated_ad_recallers", "estimated_ad_recallers_lower_bound", "estimated_ad_recallers_upper_bound", "frequency", "full_view_impressions", "full_view_reach", "gender_targeting", "impressions", "inline_link_click_ctr", "inline_link_clicks", "inline_post_engagement", "instant_experience_clicks_to_open", "instant_experience_clicks_to_start", "instant_experience_outbound_clicks", "interactive_component_tap", "labels", "location", "mobile_app_purchase_roas", "objective", "optimization_goal", "outbound_clicks", "outbound_clicks_ctr", "place_page_name", "purchase_roas", "qualifying_question_qualify_answer_rate", "quality_ranking", "quality_score_ectr", "quality_score_ecvr", "quality_score_organic", "reach", "social_spend", "spend", "total_postbacks", "total_postbacks_detailed", "unique_actions", "unique_clicks", "unique_conversions", "unique_ctr", "unique_inline_link_click_ctr", "unique_inline_link_clicks", "unique_link_clicks_ctr", "unique_outbound_clicks", "unique_outbound_clicks_ctr", "unique_video_continuous_2_sec_watched_actions", "unique_video_view_15_sec", "updated_time", "video_15_sec_watched_actions", "video_30_sec_watched_actions", "video_avg_time_watched_actions", "video_continuous_2_sec_watched_actions", "video_p100_watched_actions", "video_p25_watched_actions", "video_p50_watched_actions", "video_p75_watched_actions", "video_p95_watched_actions", "video_play_actions", "video_play_curve_actions", "video_play_retention_0_to_15s_actions", "video_play_retention_20_to_60s_actions", "video_play_retention_graph_actions", "video_thruplay_watched_actions", "video_time_watched_actions", "website_ctr", "website_purchase_roas", "wish_bid"
]

const ad_creative_fields = [
    "account_id", "actor_id", "adlabels", "applink_treatment", "asset_feed_spec", "authorization_category", "auto_update", "body", "branded_content_sponsor_page_id", "bundle_folder_id", "call_to_action_type", "categorization_criteria", "category_media_source", "collaborative_ads_lsb_image_bank_id", "degrees_of_freedom_spec", "destination_set_id", "dynamic_ad_voice", "effective_authorization_category", "effective_instagram_media_id", "effective_instagram_story_id", "effective_object_story_id", "enable_direct_install", "enable_launch_instant_app", "id", "image_crops", "image_hash", "image_url", "instagram_actor_id", "instagram_permalink_url", "instagram_story_id", "instagram_user_id", "interactive_components_spec", "link_deep_link_url", "link_destination_display_url", "link_og_id", "link_url", "messenger_sponsored_message", "name", "object_id", "object_store_url", "object_story_id", "object_story_spec", "object_type", "object_url", "omnichannel_link_spec", "place_page_set_id", "platform_customizations", "playable_asset_id", "portrait_customizations", "product_set_id", "recommender_settings", "source_instagram_media_id", "status", "template_url", "template_url_spec", "thumbnail_id", "thumbnail_url", "title", "url_tags", "use_page_actor_override", "video_id"
]

const vertical_fields = [
    "ADVERTISING", "AUTOMOTIVE", "CONSUMER_PACKAGED_GOODS", "ECOMMERCE", "EDUCATION", "ENERGY_AND_UTILITIES", "ENTERTAINMENT_AND_MEDIA", "FINANCIAL_SERVICES", "GAMING", "GOVERNMENT_AND_POLITICS", "MARKETING", "ORGANIZATIONS_AND_ASSOCIATIONS", "PROFESSIONAL_SERVICES", "RETAIL", "TECHNOLOGY", "TELECOM", "TRAVEL", "OTHER"]

const timezone_id = {
    TZ_UNKNOWN: 0,
    TZ_AMERICA_LOS_ANGELES: 1,
    TZ_AMERICA_DENVER: 2,
    TZ_PACIFIC_HONOLULU: 3,
    TZ_AMERICA_ANCHORAGE: 4,
    TZ_AMERICA_PHOENIX: 5,
    TZ_AMERICA_CHICAGO: 6,
    TZ_AMERICA_NEW_YORK: 7,
    TZ_ASIA_DUBAI: 8,
    TZ_AMERICA_ARGENTINA_SAN_LUIS: 9,
    TZ_AMERICA_ARGENTINA_BUENOS_AIRES: 10,
    TZ_AMERICA_ARGENTINA_SALTA: 11,
    TZ_EUROPE_VIENNA: 12,
    TZ_AUSTRALIA_PERTH: 13,
    TZ_AUSTRALIA_BROKEN_HILL: 14,
    TZ_AUSTRALIA_SYDNEY: 15,
    TZ_EUROPE_SARAJEVO: 16,
    TZ_ASIA_DHAKA: 17,
    TZ_EUROPE_BRUSSELS: 18,
    TZ_EUROPE_SOFIA: 19,
    TZ_ASIA_BAHRAIN: 20,
    TZ_AMERICA_LA_PAZ: 21,
    TZ_AMERICA_NORONHA: 22,
    TZ_AMERICA_CAMPO_GRANDE: 23,
    TZ_AMERICA_BELEM: 24,
    TZ_AMERICA_SAO_PAULO: 25,
    TZ_AMERICA_NASSAU: 26,
    TZ_AMERICA_DAWSON: 27,
    TZ_AMERICA_VANCOUVER: 28,
    TZ_AMERICA_DAWSON_CREEK: 29,
    TZ_AMERICA_EDMONTON: 30,
    TZ_AMERICA_RAINY_RIVER: 31,
    TZ_AMERICA_REGINA: 32,
    TZ_AMERICA_ATIKOKAN: 33,
    TZ_AMERICA_IQALUIT: 34,
    TZ_AMERICA_TORONTO: 35,
    TZ_AMERICA_BLANC_SABLON: 36,
    TZ_AMERICA_HALIFAX: 37,
    TZ_AMERICA_ST_JOHNS: 38,
    TZ_EUROPE_ZURICH: 39,
    TZ_PACIFIC_EASTER: 40,
    TZ_AMERICA_SANTIAGO: 41,
    TZ_ASIA_SHANGHAI: 42,
    TZ_AMERICA_BOGOTA: 43,
    TZ_AMERICA_COSTA_RICA: 44,
    TZ_ASIA_NICOSIA: 45,
    TZ_EUROPE_PRAGUE: 46,
    TZ_EUROPE_BERLIN: 47,
    TZ_EUROPE_COPENHAGEN: 48,
    TZ_AMERICA_SANTO_DOMINGO: 49,
    TZ_PACIFIC_GALAPAGOS: 50,
    TZ_AMERICA_GUAYAQUIL: 51,
    TZ_EUROPE_TALLINN: 52,
    TZ_AFRICA_CAIRO: 53,
    TZ_ATLANTIC_CANARY: 54,
    TZ_EUROPE_MADRID: 55,
    TZ_EUROPE_HELSINKI: 56,
    TZ_EUROPE_PARIS: 57,
    TZ_EUROPE_LONDON: 58,
    TZ_AFRICA_ACCRA: 59,
    TZ_EUROPE_ATHENS: 60,
    TZ_AMERICA_GUATEMALA: 61,
    TZ_ASIA_HONG_KONG: 62,
    TZ_AMERICA_TEGUCIGALPA: 63,
    TZ_EUROPE_ZAGREB: 64,
    TZ_EUROPE_BUDAPEST: 65,
    TZ_ASIA_JAKARTA: 66,
    TZ_ASIA_MAKASSAR: 67,
    TZ_ASIA_JAYAPURA: 68,
    TZ_EUROPE_DUBLIN: 69,
    TZ_ASIA_JERUSALEM: 70,
    TZ_ASIA_KOLKATA: 71,
    TZ_ASIA_BAGHDAD: 72,
    TZ_ATLANTIC_REYKJAVIK: 73,
    TZ_EUROPE_ROME: 74,
    TZ_AMERICA_JAMAICA: 75,
    TZ_ASIA_AMMAN: 76,
    TZ_ASIA_TOKYO: 77,
    TZ_AFRICA_NAIROBI: 78,
    TZ_ASIA_SEOUL: 79,
    TZ_ASIA_KUWAIT: 80,
    TZ_ASIA_BEIRUT: 81,
    TZ_ASIA_COLOMBO: 82,
    TZ_EUROPE_VILNIUS: 83,
    TZ_EUROPE_LUXEMBOURG: 84,
    TZ_EUROPE_RIGA: 85,
    TZ_AFRICA_CASABLANCA: 86,
    TZ_EUROPE_SKOPJE: 87,
    TZ_EUROPE_MALTA: 88,
    TZ_INDIAN_MAURITIUS: 89,
    TZ_INDIAN_MALDIVES: 90,
    TZ_AMERICA_TIJUANA: 91,
    TZ_AMERICA_HERMOSILLO: 92,
    TZ_AMERICA_MAZATLAN: 93,
    TZ_AMERICA_MEXICO_CITY: 94,
    TZ_ASIA_KUALA_LUMPUR: 95,
    TZ_AFRICA_LAGOS: 96,
    TZ_AMERICA_MANAGUA: 97,
    TZ_EUROPE_AMSTERDAM: 98,
    TZ_EUROPE_OSLO: 99,
    TZ_PACIFIC_AUCKLAND: 100,
    TZ_ASIA_MUSCAT: 101,
    TZ_AMERICA_PANAMA: 102,
    TZ_AMERICA_LIMA: 103,
    TZ_ASIA_MANILA: 104,
    TZ_ASIA_KARACHI: 105,
    TZ_EUROPE_WARSAW: 106,
    TZ_AMERICA_PUERTO_RICO: 107,
    TZ_ASIA_GAZA: 108,
    TZ_ATLANTIC_AZORES: 109,
    TZ_EUROPE_LISBON: 110,
    TZ_AMERICA_ASUNCION: 111,
    TZ_ASIA_QATAR: 112,
    TZ_EUROPE_BUCHAREST: 113,
    TZ_EUROPE_BELGRADE: 114,
    TZ_EUROPE_KALININGRAD: 115,
    TZ_EUROPE_MOSCOW: 116,
    TZ_EUROPE_SAMARA: 117,
    TZ_ASIA_YEKATERINBURG: 118,
    TZ_ASIA_OMSK: 119,
    TZ_ASIA_KRASNOYARSK: 120,
    TZ_ASIA_IRKUTSK: 121,
    TZ_ASIA_YAKUTSK: 122,
    TZ_ASIA_VLADIVOSTOK: 123,
    TZ_ASIA_MAGADAN: 124,
    TZ_ASIA_KAMCHATKA: 125,
    TZ_ASIA_RIYADH: 126,
    TZ_EUROPE_STOCKHOLM: 127,
    TZ_ASIA_SINGAPORE: 128,
    TZ_EUROPE_LJUBLJANA: 129,
    TZ_EUROPE_BRATISLAVA: 130,
    TZ_AMERICA_EL_SALVADOR: 131,
    TZ_ASIA_BANGKOK: 132,
    TZ_AFRICA_TUNIS: 133,
    TZ_EUROPE_ISTANBUL: 134,
    TZ_AMERICA_PORT_OF_SPAIN: 135,
    TZ_ASIA_TAIPEI: 136,
    TZ_EUROPE_KIEV: 137,
    TZ_AMERICA_MONTEVIDEO: 138,
    TZ_AMERICA_CARACAS: 139,
    TZ_ASIA_HO_CHI_MINH: 140,
    TZ_AFRICA_JOHANNESBURG: 141,
    TZ_AMERICA_WINNIPEG: 142,
    TZ_AMERICA_DETROIT: 143,
    TZ_AUSTRALIA_MELBOURNE: 144,
    TZ_ASIA_KATHMANDU: 145,
    TZ_ASIA_BAKU: 146,
    TZ_AFRICA_ABIDJAN: 147,
    TZ_AFRICA_ADDIS_ABABA: 148,
    TZ_AFRICA_ALGIERS: 149,
    TZ_AFRICA_ASMARA: 150,
    TZ_AFRICA_BAMAKO: 151,
    TZ_AFRICA_BANGUI: 152,
    TZ_AFRICA_BANJUL: 153,
    TZ_AFRICA_BISSAU: 154,
    TZ_AFRICA_BLANTYRE: 155,
    TZ_AFRICA_BRAZZAVILLE: 156,
    TZ_AFRICA_BUJUMBURA: 157,
    TZ_AFRICA_CEUTA: 158,
    TZ_AFRICA_CONAKRY: 159,
    TZ_AFRICA_DAKAR: 160,
    TZ_AFRICA_DAR_ES_SALAAM: 161,
    TZ_AFRICA_DJIBOUTI: 162,
    TZ_AFRICA_DOUALA: 163,
    TZ_AFRICA_EL_AAIUN: 164,
    TZ_AFRICA_FREETOWN: 165,
    TZ_AFRICA_GABORONE: 166,
    TZ_AFRICA_HARARE: 167,
    TZ_AFRICA_JUBA: 168,
    TZ_AFRICA_KAMPALA: 169,
    TZ_AFRICA_KHARTOUM: 170,
    TZ_AFRICA_KIGALI: 171,
    TZ_AFRICA_KINSHASA: 172,
    TZ_AFRICA_LIBREVILLE: 173,
    TZ_AFRICA_LOME: 174,
    TZ_AFRICA_LUANDA: 175,
    TZ_AFRICA_LUBUMBASHI: 176,
    TZ_AFRICA_LUSAKA: 177,
    TZ_AFRICA_MALABO: 178,
    TZ_AFRICA_MAPUTO: 179,
    TZ_AFRICA_MASERU: 180,
    TZ_AFRICA_MBABANE: 181,
    TZ_AFRICA_MOGADISHU: 182,
    TZ_AFRICA_MONROVIA: 183,
    TZ_AFRICA_NDJAMENA: 184,
    TZ_AFRICA_NIAMEY: 185,
    TZ_AFRICA_NOUAKCHOTT: 186,
    TZ_AFRICA_OUAGADOUGOU: 187,
    TZ_AFRICA_PORTO_NOVO: 188,
    TZ_AFRICA_SAO_TOME: 189,
    TZ_AFRICA_TRIPOLI: 190,
    TZ_AFRICA_WINDHOEK: 191,
    TZ_AMERICA_ADAK: 192,
    TZ_AMERICA_ANGUILLA: 193,
    TZ_AMERICA_ANTIGUA: 194,
    TZ_AMERICA_ARAGUAINA: 195,
    TZ_AMERICA_ARGENTINA_CATAMARCA: 196,
    TZ_AMERICA_ARGENTINA_CORDOBA: 197,
    TZ_AMERICA_ARGENTINA_JUJUY: 198,
    TZ_AMERICA_ARGENTINA_LA_RIOJA: 199,
    TZ_AMERICA_ARGENTINA_MENDOZA: 200,
    TZ_AMERICA_ARGENTINA_RIO_GALLEGOS: 201,
    TZ_AMERICA_ARGENTINA_SAN_JUAN: 202,
    TZ_AMERICA_ARGENTINA_TUCUMAN: 203,
    TZ_AMERICA_ARGENTINA_USHUAIA: 204,
    TZ_AMERICA_ARUBA: 205,
    TZ_AMERICA_BAHIA: 206,
    TZ_AMERICA_BAHIA_BANDERAS: 207,
    TZ_AMERICA_BARBADOS: 208,
    TZ_AMERICA_BELIZE: 209,
    TZ_AMERICA_BOA_VISTA: 210,
    TZ_AMERICA_BOISE: 211,
    TZ_AMERICA_CAMBRIDGE_BAY: 212,
    TZ_AMERICA_CANCUN: 213,
    TZ_AMERICA_CAYENNE: 214,
    TZ_AMERICA_CAYMAN: 215,
    TZ_AMERICA_CHIHUAHUA: 216,
    TZ_AMERICA_CRESTON: 217,
    TZ_AMERICA_CUIABA: 218,
    TZ_AMERICA_CURACAO: 219,
    TZ_AMERICA_DANMARKSHAVN: 220,
    TZ_AMERICA_DOMINICA: 221,
    TZ_AMERICA_EIRUNEPE: 222,
    TZ_AMERICA_FORT_NELSON: 223,
    TZ_AMERICA_FORTALEZA: 224,
    TZ_AMERICA_GLACE_BAY: 225,
    TZ_AMERICA_GODTHAB: 226,
    TZ_AMERICA_GOOSE_BAY: 227,
    TZ_AMERICA_GRAND_TURK: 228,
    TZ_AMERICA_GRENADA: 229,
    TZ_AMERICA_GUADELOUPE: 230,
    TZ_AMERICA_GUYANA: 231,
    TZ_AMERICA_HAVANA: 232,
    TZ_AMERICA_INDIANA_INDIANAPOLIS: 233,
    TZ_AMERICA_INDIANA_KNOX: 234,
    TZ_AMERICA_INDIANA_MARENGO: 235,
    TZ_AMERICA_INDIANA_PETERSBURG: 236,
    TZ_AMERICA_INDIANA_TELL_CITY: 237,
    TZ_AMERICA_INDIANA_VEVAY: 238,
    TZ_AMERICA_INDIANA_VINCENNES: 239,
    TZ_AMERICA_INDIANA_WINAMAC: 240,
    TZ_AMERICA_INDIANAPOLIS: 241,
    TZ_AMERICA_INUVIK: 242,
    TZ_AMERICA_JUNEAU: 243,
    TZ_AMERICA_KENTUCKY_LOUISVILLE: 244,
    TZ_AMERICA_KENTUCKY_MONTICELLO: 245,
    TZ_AMERICA_KRALENDIJK: 246,
    TZ_AMERICA_LOWER_PRINCES: 247,
    TZ_AMERICA_MACEIO: 248,
    TZ_AMERICA_MANAUS: 249,
    TZ_AMERICA_MARIGOT: 250,
    TZ_AMERICA_MARTINIQUE: 251,
    TZ_AMERICA_MATAMOROS: 252,
    TZ_AMERICA_MENOMINEE: 253,
    TZ_AMERICA_MERIDA: 254,
    TZ_AMERICA_METLAKATLA: 255,
    TZ_AMERICA_MIQUELON: 256,
    TZ_AMERICA_MONCTON: 257,
    TZ_AMERICA_MONTERREY: 258,
    TZ_AMERICA_MONTREAL: 259,
    TZ_AMERICA_MONTSERRAT: 260,
    TZ_AMERICA_NIPIGON: 261,
    TZ_AMERICA_NOME: 262,
    TZ_AMERICA_NORTH_DAKOTA_BEULAH: 263,
    TZ_AMERICA_NORTH_DAKOTA_CENTER: 264,
    TZ_AMERICA_NORTH_DAKOTA_NEW_SALEM: 265,
    TZ_AMERICA_OJINAGA: 266,
    TZ_AMERICA_PANGNIRTUNG: 267,
    TZ_AMERICA_PARAMARIBO: 268,
    TZ_AMERICA_PORT_AU_PRINCE: 269,
    TZ_AMERICA_PORTO_VELHO: 270,
    TZ_AMERICA_PUNTA_ARENAS: 271,
    TZ_AMERICA_RANKIN_INLET: 272,
    TZ_AMERICA_RECIFE: 273,
    TZ_AMERICA_RESOLUTE: 274,
    TZ_AMERICA_RIO_BRANCO: 275,
    TZ_AMERICA_SANTAREM: 276,
    TZ_AMERICA_SCORESBYSUND: 277,
    TZ_AMERICA_SITKA: 278,
    TZ_AMERICA_ST_BARTHELEMY: 279,
    TZ_AMERICA_ST_KITTS: 280,
    TZ_AMERICA_ST_LUCIA: 281,
    TZ_AMERICA_ST_THOMAS: 282,
    TZ_AMERICA_ST_VINCENT: 283,
    TZ_AMERICA_SWIFT_CURRENT: 284,
    TZ_AMERICA_THULE: 285,
    TZ_AMERICA_THUNDER_BAY: 286,
    TZ_AMERICA_TORTOLA: 287,
    TZ_AMERICA_WHITEHORSE: 288,
    TZ_AMERICA_YAKUTAT: 289,
    TZ_AMERICA_YELLOWKNIFE: 290,
    TZ_ANTARCTICA_CASEY: 291,
    TZ_ANTARCTICA_DAVIS: 292,
    TZ_ANTARCTICA_DUMONTDURVILLE: 293,
    TZ_ANTARCTICA_MACQUARIE: 294,
    TZ_ANTARCTICA_MAWSON: 295,
    TZ_ANTARCTICA_MCMURDO: 296,
    TZ_ANTARCTICA_PALMER: 297,
    TZ_ANTARCTICA_ROTHERA: 298,
    TZ_ANTARCTICA_SYOWA: 299,
    TZ_ANTARCTICA_TROLL: 300,
    TZ_ANTARCTICA_VOSTOK: 301,
    TZ_ARCTIC_LONGYEARBYEN: 302,
    TZ_ASIA_ADEN: 303,
    TZ_ASIA_ALMATY: 304,
    TZ_ASIA_ANADYR: 305,
    TZ_ASIA_AQTAU: 306,
    TZ_ASIA_AQTOBE: 307,
    TZ_ASIA_ASHGABAT: 308,
    TZ_ASIA_ATYRAU: 309,
    TZ_ASIA_BARNAUL: 310,
    TZ_ASIA_BISHKEK: 311,
    TZ_ASIA_BRUNEI: 312,
    TZ_ASIA_CHITA: 313,
    TZ_ASIA_CHOIBALSAN: 314,
    TZ_ASIA_DAMASCUS: 315,
    TZ_ASIA_DILI: 316,
    TZ_ASIA_DUSHANBE: 317,
    TZ_ASIA_FAMAGUSTA: 318,
    TZ_ASIA_HEBRON: 319,
    TZ_ASIA_HOVD: 320,
    TZ_ASIA_ISTANBUL: 321,
    TZ_ASIA_KABUL: 322,
    TZ_ASIA_KHANDYGA: 323,
    TZ_ASIA_KUCHING: 324,
    TZ_ASIA_MACAU: 325,
    TZ_ASIA_NOVOKUZNETSK: 326,
    TZ_ASIA_NOVOSIBIRSK: 327,
    TZ_ASIA_ORAL: 328,
    TZ_ASIA_PHNOM_PENH: 329,
    TZ_ASIA_PONTIANAK: 330,
    TZ_ASIA_PYONGYANG: 331,
    TZ_ASIA_QOSTANAY: 332,
    TZ_ASIA_QYZYLORDA: 333,
    TZ_ASIA_SAKHALIN: 334,
    TZ_ASIA_SAMARKAND: 335,
    TZ_ASIA_SREDNEKOLYMSK: 336,
    TZ_ASIA_TASHKENT: 337,
    TZ_ASIA_TBILISI: 338,
    TZ_ASIA_TEHRAN: 339,
    TZ_ASIA_THIMPHU: 340,
    TZ_ASIA_TOMSK: 341,
    TZ_ASIA_ULAANBAATAR: 342,
    TZ_ASIA_URUMQI: 343,
    TZ_ASIA_UST_NERA: 344,
    TZ_ASIA_VIENTIANE: 345,
    TZ_ASIA_YANGON: 346,
    TZ_ASIA_YEREVAN: 347,
    TZ_ATLANTIC_BERMUDA: 348,
    TZ_ATLANTIC_CAPE_VERDE: 349,
    TZ_ATLANTIC_FAROE: 350,
    TZ_ATLANTIC_MADEIRA: 351,
    TZ_ATLANTIC_SOUTH_GEORGIA: 352,
    TZ_ATLANTIC_ST_HELENA: 353,
    TZ_ATLANTIC_STANLEY: 354,
    TZ_AUSTRALIA_ADELAIDE: 355,
    TZ_AUSTRALIA_BRISBANE: 356,
    TZ_AUSTRALIA_CURRIE: 357,
    TZ_AUSTRALIA_DARWIN: 358,
    TZ_AUSTRALIA_EUCLA: 359,
    TZ_AUSTRALIA_HOBART: 360,
    TZ_AUSTRALIA_LINDEMAN: 361,
    TZ_AUSTRALIA_LORD_HOWE: 362,
    TZ_CET: 363,
    TZ_CST6CDT: 364,
    TZ_EET: 365,
    TZ_EST: 366,
    TZ_EST5EDT: 367,
    TZ_ETC_GMT: 368,
    TZ_ETC_GMT_PLUS_0: 369,
    TZ_ETC_GMT_PLUS_1: 370,
    TZ_ETC_GMT_PLUS_10: 371,
    TZ_ETC_GMT_PLUS_11: 372,
    TZ_ETC_GMT_PLUS_12: 373,
    TZ_ETC_GMT_PLUS_2: 374,
    TZ_ETC_GMT_PLUS_3: 375,
    TZ_ETC_GMT_PLUS_4: 376,
    TZ_ETC_GMT_PLUS_5: 377,
    TZ_ETC_GMT_PLUS_6: 378,
    TZ_ETC_GMT_PLUS_7: 379,
    TZ_ETC_GMT_PLUS_8: 380,
    TZ_ETC_GMT_PLUS_9: 381,
    TZ_ETC_GMT_MINUS_0: 382,
    TZ_ETC_GMT_MINUS_1: 383,
    TZ_ETC_GMT_MINUS_10: 384,
    TZ_ETC_GMT_MINUS_11: 385,
    TZ_ETC_GMT_MINUS_12: 386,
    TZ_ETC_GMT_MINUS_13: 387,
    TZ_ETC_GMT_MINUS_14: 388,
    TZ_ETC_GMT_MINUS_2: 389,
    TZ_ETC_GMT_MINUS_3: 390,
    TZ_ETC_GMT_MINUS_4: 391,
    TZ_ETC_GMT_MINUS_5: 392,
    TZ_ETC_GMT_MINUS_6: 393,
    TZ_ETC_GMT_MINUS_7: 394,
    TZ_ETC_GMT_MINUS_8: 395,
    TZ_ETC_GMT_MINUS_9: 396,
    TZ_ETC_GMT0: 397,
    TZ_ETC_GREENWICH: 398,
    TZ_ETC_UNIVERSAL: 399,
    TZ_ETC_ZULU: 400,
    TZ_EUROPE_ANDORRA: 401,
    TZ_EUROPE_ASTRAKHAN: 402,
    TZ_EUROPE_BUSINGEN: 403,
    TZ_EUROPE_CHISINAU: 404,
    TZ_EUROPE_GIBRALTAR: 405,
    TZ_EUROPE_GUERNSEY: 406,
    TZ_EUROPE_ISLE_OF_MAN: 407,
    TZ_EUROPE_JERSEY: 408,
    TZ_EUROPE_KIROV: 409,
    TZ_EUROPE_MARIEHAMN: 410,
    TZ_EUROPE_MINSK: 411,
    TZ_EUROPE_MONACO: 412,
    TZ_EUROPE_NICOSIA: 413,
    TZ_EUROPE_PODGORICA: 414,
    TZ_EUROPE_SAN_MARINO: 415,
    TZ_EUROPE_SARATOV: 416,
    TZ_EUROPE_SIMFEROPOL: 417,
    TZ_EUROPE_TIRANE: 418,
    TZ_EUROPE_ULYANOVSK: 419,
    TZ_EUROPE_UZHGOROD: 420,
    TZ_EUROPE_VADUZ: 421,
    TZ_EUROPE_VATICAN: 422,
    TZ_EUROPE_VOLGOGRAD: 423,
    TZ_EUROPE_ZAPOROZHYE: 424,
    TZ_GMT: 425,
    TZ_HST: 426,
    TZ_INDIAN_ANTANANARIVO: 427,
    TZ_INDIAN_CHAGOS: 428,
    TZ_INDIAN_CHRISTMAS: 429,
    TZ_INDIAN_COCOS: 430,
    TZ_INDIAN_COMORO: 431,
    TZ_INDIAN_KERGUELEN: 432,
    TZ_INDIAN_MAHE: 433,
    TZ_INDIAN_MAYOTTE: 434,
    TZ_INDIAN_REUNION: 435,
    TZ_MET: 436,
    TZ_MST: 437,
    TZ_MST7MDT: 438,
    TZ_PST8PDT: 439,
    TZ_PACIFIC_APIA: 440,
    TZ_PACIFIC_BOUGAINVILLE: 441,
    TZ_PACIFIC_CHATHAM: 442,
    TZ_PACIFIC_CHUUK: 443,
    TZ_PACIFIC_EFATE: 444,
    TZ_PACIFIC_ENDERBURY: 445,
    TZ_PACIFIC_FAKAOFO: 446,
    TZ_PACIFIC_FIJI: 447,
    TZ_PACIFIC_FUNAFUTI: 448,
    TZ_PACIFIC_GAMBIER: 449,
    TZ_PACIFIC_GUADALCANAL: 450,
    TZ_PACIFIC_GUAM: 451,
    TZ_PACIFIC_KIRITIMATI: 452,
    TZ_PACIFIC_KOSRAE: 453,
    TZ_PACIFIC_KWAJALEIN: 454,
    TZ_PACIFIC_MAJURO: 455,
    TZ_PACIFIC_MARQUESAS: 456,
    TZ_PACIFIC_MIDWAY: 457,
    TZ_PACIFIC_NAURU: 458,
    TZ_PACIFIC_NIUE: 459,
    TZ_PACIFIC_NORFOLK: 460,
    TZ_PACIFIC_NOUMEA: 461,
    TZ_PACIFIC_PAGO_PAGO: 462,
    TZ_PACIFIC_PALAU: 463,
    TZ_PACIFIC_PITCAIRN: 464,
    TZ_PACIFIC_POHNPEI: 465,
    TZ_PACIFIC_PORT_MORESBY: 466,
    TZ_PACIFIC_RAROTONGA: 467,
    TZ_PACIFIC_SAIPAN: 468,
    TZ_PACIFIC_TAHITI: 469,
    TZ_PACIFIC_TARAWA: 470,
    TZ_PACIFIC_TONGATAPU: 471,
    TZ_PACIFIC_WAKE: 472,
    TZ_PACIFIC_WALLIS: 473,
    TZ_UTC: 474,
    TZ_WET: 475,
    TZ_ASIA_CALCUTTA: 476,
    TZ_ASIA_KATMANDU: 477,
    TZ_AMERICA_NUUK: 478,
    TZ_NUM_TIMEZONES: 479

}

fields = {
    1: insights_fields,
    2: ad_set_fields,
    3: ad_fields,
    4: ad_creative_fields,
    5: vertical_fields,
    6: timezone_id
}

module.exports = {
    fields
}
