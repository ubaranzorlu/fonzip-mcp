// Bu dosya otomatik uretildi. Elle duzenlemeyin.
// Kaynak: openapi/fonzip-v2.yaml (Fonzip API v2.40.0)
// Yeniden uretmek icin: npm run generate
//
// Asagidaki operasyon adlari, aciklamalari ve sema tanimlari Fonzip Yazilim
// A.S.'ye ait API dokumanindan turemistir; MIT lisansi bu metinleri kapsamaz.
// Ayrinti: NOTICE

import type { ToolGroup } from "../types.js";

/** Uretimde kullanilan OpenAPI spec surumu. */
export const SPEC_VERSION = "2.40.0";

/** Spec'te tanimli varsayilan API adresi. */
export const DEFAULT_BASE_URL = "https://fonzip.com/api/v2";

export const TOOL_GROUPS: ToolGroup[] = [
  {
    "name": "fonzip_system",
    "description": "Hesap ve sistem bilgileri: baglantiyi dogrulayan kurum bilgisi (me), odeme sistemleri, banka hesaplari ve pazarlama kanallari. Kurulumu dogrulamak veya diger tool'larda kullanilacak ID'leri bulmak icin buradan baslayin.",
    "readOnly": true,
    "actions": [
      {
        "action": "list_bank_accounts",
        "operationId": "getBankAccountList",
        "method": "GET",
        "path": "/bank-accounts",
        "summary": "List Bank Accounts",
        "params": [
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list_marketing_channel_filter_values",
        "operationId": "getMarketingChannelFilterValues",
        "method": "GET",
        "path": "/marketing-channels/filter-values",
        "summary": "Marketing Channel Filter Values",
        "params": [],
        "bodyRequired": false
      },
      {
        "action": "list_marketing_channels",
        "operationId": "getMarketingChannelList",
        "method": "GET",
        "path": "/marketing-channels",
        "summary": "List Marketing Channels",
        "params": [
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list_payment_systems",
        "operationId": "getPaymentSystemsList",
        "method": "GET",
        "path": "/payment-systems",
        "summary": "List Payment Systems",
        "params": [
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "me",
        "operationId": "getMe",
        "method": "GET",
        "path": "/me",
        "summary": "Get My Info",
        "params": [],
        "bodyRequired": false
      }
    ]
  },
  {
    "name": "fonzip_users",
    "description": "Uyeler/bagiscilar (kisiler): listeleme ve arama, detay, olusturma, guncelleme, silme; kisinin zaman tuneli, etiketleri, bagislari, aidatlari, biletleri ve form cevaplari.",
    "readOnly": false,
    "actions": [
      {
        "action": "add_tag",
        "operationId": "addTagToUser",
        "method": "POST",
        "path": "/user/{user_id}/tags/{tag_id}",
        "summary": "Adds Tag to User",
        "params": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "tag_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "create",
        "operationId": "createUser",
        "method": "POST",
        "path": "/user",
        "summary": "Create User",
        "params": [
          {
            "name": "corporate_type",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "true if user is set as corporate/organization"
            }
          },
          {
            "name": "first_name",
            "in": "body",
            "required": true,
            "schema": {
              "type": "string",
              "description": "first name"
            }
          },
          {
            "name": "last_name",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "last name"
            }
          },
          {
            "name": "tckno",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Users Identity Number / Organization tax number"
            }
          },
          {
            "name": "email",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "email",
              "description": "email"
            }
          },
          {
            "name": "phone",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "phone"
            }
          },
          {
            "name": "membership_no_decision",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "how to assign the new membership number - no: does not make any changes - auto: assigns the next available membership number incrementally - custom: sets your value",
              "enum": [
                "no",
                "auto",
                "custom"
              ]
            }
          },
          {
            "name": "membership_no",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "users membership number"
            }
          },
          {
            "name": "birthday",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date",
              "description": "Birthday"
            }
          },
          {
            "name": "email_second",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "email",
              "description": "second email"
            }
          },
          {
            "name": "nationality_text",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "nationality"
            }
          },
          {
            "name": "home_phone_first",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Home phone"
            }
          },
          {
            "name": "address",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Address"
            }
          },
          {
            "name": "district_text",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "District"
            }
          },
          {
            "name": "city_text",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "City"
            }
          },
          {
            "name": "country_text",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Country"
            }
          },
          {
            "name": "post_code",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Post code"
            }
          },
          {
            "name": "work_phone",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Work phone"
            }
          },
          {
            "name": "work_address",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Work address"
            }
          },
          {
            "name": "work_district_text",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Work district"
            }
          },
          {
            "name": "work_city_text",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Work city"
            }
          },
          {
            "name": "work_country_text",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Work country"
            }
          },
          {
            "name": "work_post_code",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Work post code"
            }
          },
          {
            "name": "apply_date",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "users application date"
            }
          },
          {
            "name": "join_date",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "users join date"
            }
          },
          {
            "name": "allow_comm_via_phone",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "if user has communication permission via phone"
            }
          },
          {
            "name": "allow_comm_via_sms",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "if user has communication permission via sms"
            }
          },
          {
            "name": "allow_comm_via_email",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "if user has communication permission via email"
            }
          },
          {
            "name": "allow_comm_via_phone_date",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "phone communication permission update date"
            }
          },
          {
            "name": "allow_comm_via_sms_date",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "sms communication permission update date"
            }
          },
          {
            "name": "allow_comm_via_email_date",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "email communication permission update date"
            }
          },
          {
            "name": "user_defined_values",
            "in": "body",
            "required": false,
            "schema": {
              "type": "object",
              "description": "user defined values as key value pairs",
              "properties": {
                "key": {
                  "description": "UDV Key (value*) paired with corresponding value",
                  "default": "value",
                  "oneOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "number"
                    },
                    {
                      "type": "object"
                    },
                    {
                      "type": "array"
                    },
                    {
                      "type": "boolean"
                    }
                  ]
                }
              }
            }
          },
          {
            "name": "tags",
            "in": "body",
            "required": false,
            "schema": {
              "type": "array",
              "description": "tag id's to be added",
              "items": {
                "type": "integer"
              }
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      },
      {
        "action": "delete",
        "operationId": "deleteUser",
        "method": "DELETE",
        "path": "/user/{user_id}",
        "summary": "Delete User",
        "params": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "get",
        "operationId": "getUserDetails",
        "method": "GET",
        "path": "/user/{user_id}",
        "summary": "Get User Details",
        "params": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list",
        "operationId": "getUserList",
        "method": "POST",
        "path": "/users",
        "summary": "List Users",
        "params": [
          {
            "name": "search",
            "in": "body",
            "required": true,
            "schema": {
              "type": "object",
              "required": [
                "start_page",
                "how_many",
                "order_by",
                "filter"
              ],
              "properties": {
                "start_page": {
                  "description": "start page",
                  "type": "integer",
                  "default": 1,
                  "minimum": 1
                },
                "how_many": {
                  "description": "how many records should be listed",
                  "type": "integer",
                  "default": 10,
                  "maximum": 100,
                  "minimum": 1
                },
                "order_by": {
                  "description": "ordering. Gecerli degerler: id, -id, name, -name, first_name, -first_name, last_name, -last_name, membership_no, -membership_no, email, -email, phone, -phone, tckno, -tckno, total_financial, -total_financial, -birthday, birthday, apply_date, -apply_date, join_date, -join_date, last_update_date, -last_update_date",
                  "type": "string",
                  "default": "id"
                },
                "filter": {
                  "description": "filters",
                  "type": "object",
                  "required": [
                    "condition",
                    "attributes"
                  ],
                  "properties": {
                    "condition": {
                      "type": "string",
                      "enum": [
                        "and",
                        "or"
                      ]
                    },
                    "attributes": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "required": [
                          "type",
                          "parameter",
                          "condition"
                        ],
                        "properties": {
                          "type": {
                            "description": "Field type. Use default for system defined fields, Use custom for user defined fields",
                            "type": "string",
                            "default": "default",
                            "enum": [
                              "default",
                              "custom"
                            ]
                          },
                          "parameter": {
                            "description": "Parameter for search. Gecerli degerler: name, address, donation_amount, donation_count, donation_date, fundraising_campaign, sub_donation_type, donation_page, donor_type, fundraising_campaign_count, apply_date, total_financial, subscription_payment_date, subscription_payment_amount, birthdate, birthday, custom_form, recurring_debt, recurring_donor, total_recurring_withdrawal_count, total_recurring_withdrawal_amount, email, tags, registered_event_count, event_register_date, form_complete_date, district, allow_comm_via_phone, allow_comm_via_sms, allow_comm_via_email, registered_event, join_date, fundraising_campaign_start_date, fundraising_campaign_end_date, fundraising_campaign_donation_total, fundraising_campaign_donation_count, fundraising_campaign_total_donation_total, fundraising_campaign_total_donation_count, notes, registered_card, post_code, profile_pic, bought_certificate, certificate, certificate_count, certificate_date, admin, create_date, last_update_date, city, tckno, phone, total_donation_amount, nationality, country, membership_no, age, notify_after_dues_withdrawal, default_dues_reminder_withdrawal, card_add_date, dues_card_add_date, possible_duplicate, reminder_settings, automatic_dues_withdrawal, reminder_next_cycle, reminder_period, last_login_date, work_district, work_city, work_country, work_address, work_post_code, corporate_type, donation_currency, certificate_currency, recurring_donation_amount, total_recurring_donation_amount, total_recurring_donation_count, recurring_donation_start_date, recurring_donation_cancel_date, fundraising_campaign_status, fu…",
                            "type": "string"
                          },
                          "value": {
                            "oneOf": [
                              {
                                "type": "number"
                              },
                              {
                                "type": "string"
                              },
                              {
                                "type": "integer"
                              },
                              {
                                "type": "object"
                              }
                            ]
                          },
                          "attributes": {
                            "type": "array",
                            "items": {
                              "type": "object"
                            }
                          },
                          "condition": {
                            "description": "Filtering condition - eq : equals to value - contains: contains value (split via ; for multiple records for id and membership_no) - exclude: value excluded - exist: parameters value exist - isnull: parameters value is null - duplicate: duplicate records for parameter (email, phone, tckno, membership_no) - lte: less th…. Gecerli degerler: eq, contains, exclude, exist, isnull, duplicate, lte, lt, gte, gt, neq, or, and, !lt, !gt, =, +=, <, >, (), .",
                            "type": "string"
                          },
                          "key_type": {
                            "type": "integer",
                            "description": "User defined value type - 0: text - 1: paragraph - 2: number - 3:date - 4:year - 5: date-time - 6: boolean - 7: select - 8: multiple select",
                            "enum": [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6,
                              7,
                              8,
                              9,
                              10
                            ]
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          {
            "name": "values_list",
            "in": "body",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string",
                "description": "Gecerli degerler: id, corporate_type, first_name, last_name, nationality_text, country_text, city_text, district_text, address, birthday, total_financial, work_address, work_phone, work_country_text, work_city_text, work_district_text, email, tags_as_text, last_update_date, last_login_date, phone, profile_pic, membership_no, tckno, apply_date, join_date, allow_comm_via_email, allow_comm_via_phone, allow_comm_via_sms, allow_comm_via_email_date, allow_comm_via_phone_date, allow_comm_via_sms_date, user_defined_values__KEY"
              }
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      },
      {
        "action": "list_donations",
        "operationId": "getUsersDonationList",
        "method": "GET",
        "path": "/user/{user_id}/donations",
        "summary": "List Users Donations",
        "params": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list_ecard_transactions",
        "operationId": "getUserEcardTransactionList",
        "method": "GET",
        "path": "/user/{user_id}/ecard-transactions",
        "summary": "List Users E-Cards",
        "params": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list_form_answers",
        "operationId": "getUserAnswerList",
        "method": "GET",
        "path": "/user/{user_id}/form-answers",
        "summary": "List Users Answers",
        "params": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list_membership_dues",
        "operationId": "getUsersMembershipDueList",
        "method": "GET",
        "path": "/user/{user_id}/subscriptions",
        "summary": "List Users Membership Dues",
        "params": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "listing",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Which operations should be fetched? <br> - a: all <br> - p: payments <br> - d: debts <br> - r: refunds",
              "enum": [
                "a",
                "p",
                "d",
                "d"
              ]
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list_micro_donations",
        "operationId": "getUsersMicroDonationList",
        "method": "GET",
        "path": "/user/{user_id}/micro-donations",
        "summary": "List Users Micro Donations",
        "params": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list_monthly_donations",
        "operationId": "getUsersMonthlyDonationList",
        "method": "GET",
        "path": "/user/{user_id}/monthly-donations",
        "summary": "List Users Monthly Donations",
        "params": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list_tags",
        "operationId": "getUsersTagsList",
        "method": "GET",
        "path": "/user/{user_id}/tags",
        "summary": "List Users Tags",
        "params": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list_tickets",
        "operationId": "getUserBoughtTicketList",
        "method": "GET",
        "path": "/user/{user_id}/tickets",
        "summary": "List Users Bought Tickets",
        "params": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list_user_defined_values",
        "operationId": "getUserDefinedValuesList",
        "method": "GET",
        "path": "/user-defined-values",
        "summary": "List User Defined Values",
        "params": [],
        "bodyRequired": false
      },
      {
        "action": "login_link",
        "operationId": "generateLoginLinkForUser",
        "method": "GET",
        "path": "/user/{user_id}/login-link",
        "summary": "Generate Login Link For User",
        "params": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "redirection_type",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "default": 5,
              "description": "redirection for login link - 3: Dues payment page of user - 4: Donations of user - 5: Main Page (Default) - 10: Membership Card - 12: Membership Dues Card Update",
              "enum": [
                3,
                4,
                5,
                10,
                12
              ]
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "remove_tag",
        "operationId": "removeTagFromUser",
        "method": "DELETE",
        "path": "/user/{user_id}/tags/{tag_id}",
        "summary": "Removes Tag from User",
        "params": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "tag_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "timeline",
        "operationId": "getUsersTimeline",
        "method": "GET",
        "path": "/user/{user_id}/timeline",
        "summary": "List Users Timeline",
        "params": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "require_total",
            "in": "query",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "return total number of timeline events"
            }
          },
          {
            "name": "notes_only",
            "in": "query",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "list only notes"
            }
          },
          {
            "name": "tag_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "filter by note tag if notes_only is true"
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "update",
        "operationId": "updateUser",
        "method": "PUT",
        "path": "/user/{user_id}",
        "summary": "Update User",
        "params": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "type",
            "in": "body",
            "required": true,
            "schema": {
              "type": "string",
              "description": "Updating field type. - single: for single system defined field - multiple: for multiple fields - udv: for single user defined value field - membership_no: updating membership no",
              "enum": [
                "single",
                "multiple",
                "udv",
                "membership_no"
              ]
            }
          },
          {
            "name": "data",
            "in": "body",
            "required": true,
            "schema": {
              "oneOf": [
                {
                  "type": "object",
                  "properties": {
                    "field": {
                      "type": "string",
                      "description": "field to be updated. Gecerli degerler: first_name, last_name, nationality_text, tckno, birthday, email, phone, home_phone_first, address, post_code, district_text, city_text, country_text, work_phone, work_address, work_post_code, private, work_district_text, work_city_text, work_country_text, email_second, apply_date, join_date, corporate_type"
                    },
                    "value": {
                      "oneOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "number"
                        },
                        {
                          "type": "boolean"
                        },
                        {
                          "type": "string",
                          "format": "date-time"
                        }
                      ]
                    }
                  }
                },
                {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "field": {
                        "type": "string",
                        "description": "field to be updated. Gecerli degerler: first_name, last_name, nationality_text, tckno, birthday, email, phone, home_phone_first, address, post_code, district_text, city_text, country_text, work_phone, work_address, work_post_code, private, work_district_text, work_city_text, work_country_text, email_second, apply_date, join_date, corporate_type"
                      },
                      "value": {
                        "oneOf": [
                          {
                            "type": "string"
                          },
                          {
                            "type": "number"
                          },
                          {
                            "type": "boolean"
                          },
                          {
                            "type": "string",
                            "format": "date-time"
                          }
                        ]
                      }
                    }
                  }
                },
                {
                  "type": "object",
                  "properties": {
                    "udv_id": {
                      "type": "integer",
                      "description": "user defined value id"
                    },
                    "value": {
                      "oneOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "number"
                        },
                        {
                          "type": "boolean"
                        },
                        {
                          "type": "object"
                        },
                        {
                          "type": "array"
                        },
                        {
                          "type": "string",
                          "format": "date-time"
                        }
                      ]
                    }
                  }
                },
                {
                  "type": "object",
                  "properties": {
                    "membership_no_decision": {
                      "type": "string",
                      "description": "how to assign the new membership number - no: does not make any changes - auto: assigns the next available membership number incrementally - custom: sets your value",
                      "enum": [
                        "no",
                        "auto",
                        "custom"
                      ]
                    },
                    "membership_no": {
                      "type": "integer",
                      "description": "custom membership number you'd like to set, valid when membership_no_decision is custom"
                    }
                  }
                }
              ]
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      }
    ]
  },
  {
    "name": "fonzip_donations",
    "description": "Bagislar: listeleme (tarih araligi zorunlu), detay, olusturma, silme, rapor; bagis kategorileri; mikro bagislar; bagis sayfalari ve formlari.",
    "readOnly": false,
    "actions": [
      {
        "action": "create",
        "operationId": "createDonation",
        "method": "POST",
        "path": "/donations",
        "summary": "Create Donation",
        "params": [
          {
            "name": "d_type",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "Donation Type - 0: cash - 1: noncash / inkind",
              "enum": [
                0,
                1
              ]
            }
          },
          {
            "name": "amount",
            "in": "body",
            "required": false,
            "schema": {
              "type": "number",
              "format": "double",
              "description": "donation amount"
            }
          },
          {
            "name": "currency",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Currency ISO Code"
            }
          },
          {
            "name": "complete_date",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "Donation Date"
            }
          },
          {
            "name": "details",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Donation details"
            }
          },
          {
            "name": "member_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "User ID / if not available, a new user will be created"
            }
          },
          {
            "name": "first_name",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "first name"
            }
          },
          {
            "name": "last_name",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "last name"
            }
          },
          {
            "name": "email",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "email",
              "description": "email"
            }
          },
          {
            "name": "phone",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "phone number"
            }
          },
          {
            "name": "tckno",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Users Identity Number"
            }
          },
          {
            "name": "tax_department",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "maxLength": 55,
              "description": "Donor's tax office (vergi dairesi). Only meaningful when donor_type is \"corporate\"; ignored for personal donors."
            }
          },
          {
            "name": "donor_type",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Donor type - personal: donor is a person - corporate: donor is an organization",
              "enum": [
                "personal",
                "corporate"
              ]
            }
          },
          {
            "name": "birthday",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date",
              "description": "users birthday"
            }
          },
          {
            "name": "district",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "district"
            }
          },
          {
            "name": "city",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "city"
            }
          },
          {
            "name": "address",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "address"
            }
          },
          {
            "name": "post_code",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "post/zip code"
            }
          },
          {
            "name": "payment_method",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "payment type code - 0: Card - 1: Cash - 2: Wire Transfer - 3: POS - 4: SMS - 6: Postal Check - 7: Paypal - 8: BKM Express - 9: iDEAL - 10: Pay With Iyzico",
              "enum": [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10
              ]
            }
          },
          {
            "name": "transaction_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "bank transaction id"
            }
          },
          {
            "name": "payment_method_select",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "payment_method_select - card: card donation (!! Not available in API !!) - other: other (must set to other)",
              "enum": [
                "card",
                "other"
              ]
            }
          },
          {
            "name": "receipt_no",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "receipt no"
            }
          },
          {
            "name": "section",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "donation section - page: ngo fundraising page - fundraising: fundraising campaign - form: donation form/module - other: other",
              "enum": [
                "page",
                "fundraising",
                "form",
                "other"
              ]
            }
          },
          {
            "name": "category_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "donation category id"
            }
          },
          {
            "name": "fundraising_page_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "ngo fundraising page id"
            }
          },
          {
            "name": "module_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "donation form/module id"
            }
          },
          {
            "name": "fundraising_campaign_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "fundraising campaign id"
            }
          },
          {
            "name": "name_hidden",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "name is hidden in fundraising campaign donor list"
            }
          },
          {
            "name": "amount_visible",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "amount is visible in fundraising campaign donor list"
            }
          },
          {
            "name": "bank_account_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "Bank Account ID"
            }
          },
          {
            "name": "send_thanks_mail",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "send mail to donor"
            }
          },
          {
            "name": "thanks_mail_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "mail template id"
            }
          },
          {
            "name": "ecard_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "ecard id"
            }
          },
          {
            "name": "send_thanks_sms",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "send thanks sms"
            }
          },
          {
            "name": "thanks_sms_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "sms template id"
            }
          },
          {
            "name": "referring",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "donation in honor of someone"
            }
          },
          {
            "name": "referring_name",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "honorees name"
            }
          },
          {
            "name": "referring_email",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "email",
              "description": "honoree's email"
            }
          },
          {
            "name": "referring_phone",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "honoree's phone"
            }
          },
          {
            "name": "referring_district",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "honoree's district"
            }
          },
          {
            "name": "referring_city",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "honoree's city"
            }
          },
          {
            "name": "referring_address",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "honoree's address"
            }
          },
          {
            "name": "referring_thanks_mail_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "mail template id to send to honoree"
            }
          },
          {
            "name": "referring_ecard_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "ecard id to send to honoree"
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      },
      {
        "action": "create_category",
        "operationId": "createDonationCategory",
        "method": "POST",
        "path": "/donation-categories",
        "summary": "Create Donation Category",
        "params": [
          {
            "name": "name",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Donation/E-Card Category name"
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      },
      {
        "action": "delete",
        "operationId": "deleteDonation",
        "method": "DELETE",
        "path": "/donation/{donation_id}",
        "summary": "Delete Donation",
        "params": [
          {
            "name": "donation_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "delete_category",
        "operationId": "deleteDonationCategory",
        "method": "DELETE",
        "path": "/donation-category/{category_id}",
        "summary": "Delete Donation Category",
        "params": [
          {
            "name": "category_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "get",
        "operationId": "getDonationDetails",
        "method": "GET",
        "path": "/donation/{donation_id}",
        "summary": "Get Donation Details",
        "params": [
          {
            "name": "donation_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "get_micro",
        "operationId": "getMicroDonationDetails",
        "method": "GET",
        "path": "/donation/micro/{donation_id}",
        "summary": "Get Micro Donation Details",
        "params": [
          {
            "name": "donation_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list",
        "operationId": "getDonationList",
        "method": "GET",
        "path": "/donations",
        "summary": "List Donations",
        "params": [
          {
            "name": "status",
            "in": "query",
            "required": false,
            "defaultValue": "paid",
            "schema": {
              "type": "string",
              "default": "paid",
              "enum": [
                "paid",
                "refund",
                "failed"
              ],
              "description": "what kind of donations should be listed"
            }
          },
          {
            "name": "list",
            "in": "query",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string",
                "description": "field names. Gecerli degerler: details, name_surname, address, amount, sub_donation_type, birthday, email_status, complete_date, fundraising_campaign, tckno, tax_department, phone, donation_page, module, payment_method, added_by_id, f2f_group_id, fonzip_id, recurring_order_id, recurring_withdraw_count, recurring_total_withdraw_count, recurring_total_withdraw_amount, transaction_id, provision_no, auth_code, reference_id, ip_address, fundraising_campaign_user, api_tracking_id, news_via_phone, news_via_sms, news_via_email, application, card_number, receipt_no, donor_type, amount_visible, name_hidden, message, show_message, referring_name, referring_email, referring_phone, bank_account__name, payment_settings__name, recurring_cancel_reason, recurring_cancel_date, recurring_start_date, recurring_stop_date, cancelled_by_id, marketing_channel__utm_source, marketing_channel__utm_medium, marketing_channel__utm_campaign, marketing_channel__utm_content"
              },
              "description": "which values should be listed"
            }
          },
          {
            "name": "category_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "default": null,
              "description": "donation category id, null for all"
            }
          },
          {
            "name": "no_category",
            "in": "query",
            "required": false,
            "schema": {
              "type": "boolean",
              "default": null,
              "description": "when true, return only donations that have no donation category assigned. Ignored if category_id is also supplied."
            }
          },
          {
            "name": "donation_page",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "donation page id"
            }
          },
          {
            "name": "fundraising_campaign",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "fundraising campaign id"
            }
          },
          {
            "name": "association_campaign_target",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "fundraising event id"
            }
          },
          {
            "name": "payment_settings_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "payment settings id"
            }
          },
          {
            "name": "bank_account_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "bank account id"
            }
          },
          {
            "name": "utm_source",
            "in": "query",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Filter donations whose marketing channel `utm_source` matches one of the supplied values (IN-list). Repeat the parameter to supply multiple values, e.g. `?utm_source=google&utm_source=bing`."
            }
          },
          {
            "name": "utm_medium",
            "in": "query",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Filter donations by one or more `utm_medium` values (IN-list)."
            }
          },
          {
            "name": "utm_campaign",
            "in": "query",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Filter donations by one or more `utm_campaign` values (IN-list)."
            }
          },
          {
            "name": "utm_content",
            "in": "query",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Filter donations by one or more `utm_content` values (IN-list)."
            }
          },
          {
            "name": "marketing_channel_null",
            "in": "query",
            "required": false,
            "schema": {
              "type": "boolean",
              "default": null,
              "description": "When true, return only donations with no marketing channel attached (organic / direct traffic). Mutually exclusive with the four UTM filters above — when set, those are ignored."
            }
          },
          {
            "name": "api_tracking_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "API Tracking ID"
            }
          },
          {
            "name": "order_by",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "default": "-transaction__complete_date",
              "enum": [
                "name",
                "-name",
                "transaction__amount",
                "-transaction__amount",
                "transaction__complete_date",
                "-transaction__complete_date"
              ],
              "description": "ordering"
            }
          },
          {
            "name": "recurring",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "default": -1,
              "description": "filter recurring donations - 1: only recurring, - 0: exclude recurring, - -1: list all",
              "enum": [
                1,
                0,
                -1
              ]
            }
          },
          {
            "name": "donor_type",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "default": null,
              "description": "filter donations by donor_type - null: all - personal: only personal donations - corporate: only corporate donations",
              "enum": [
                null,
                "personal",
                "corporate"
              ]
            }
          },
          {
            "name": "amount",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "payment/debt amount"
            }
          },
          {
            "name": "amt_cnd",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "default": null,
              "enum": [
                null,
                "!=",
                "<",
                "<=",
                ">",
                ">="
              ],
              "description": "amount condition if amount filter is present - null: equals to amount - !=: not equals to amount - <: smaller than amount - <=: smaller and equal to amount - \\>: bigger than amount - \\>=: bigger and equal to amount"
            }
          },
          {
            "name": "bin_number",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "card BIN number"
            }
          },
          {
            "name": "last_four",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "card last four digits"
            }
          },
          {
            "name": "query",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "search parameter. start with - (minus) char to exclude searched text"
            }
          },
          {
            "name": "start_date",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "Start date filtering for transaction__complete_date or complete_date fields. Must be before end_date."
            }
          },
          {
            "name": "end_date",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "End date filtering for transaction__complete_date or complete_date fields. Must be after start_date."
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          },
          {
            "name": "payment_method",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "enum": [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10
              ],
              "description": "payment type code - null: All - 0: Card - 1: Cash - 2: Wire Transfer - 3: POS - 4: SMS - 6: Postal Check - 7: Paypal - 8: BKM Express - 9: iDEAL - 10: Pay With Iyzico"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list_categories",
        "operationId": "getDonationCategoryList",
        "method": "GET",
        "path": "/donation-categories",
        "summary": "List Donation Categories",
        "params": [
          {
            "name": "query",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "search parameter. start with - (minus) char to exclude searched text"
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list_donation_forms",
        "operationId": "getDonationFormList",
        "method": "GET",
        "path": "/donation-forms",
        "summary": "List Donation Forms",
        "params": [
          {
            "name": "query",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "search parameter. start with - (minus) char to exclude searched text"
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          },
          {
            "name": "category_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "donation forms' donation category id"
            }
          },
          {
            "name": "payment_settings_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "donation forms' payment settings id"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list_donation_pages",
        "operationId": "getDonationPageList",
        "method": "GET",
        "path": "/donation-pages",
        "summary": "List Donation Pages",
        "params": [
          {
            "name": "query",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "search parameter. start with - (minus) char to exclude searched text"
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          },
          {
            "name": "category_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "donation pages' donation category id"
            }
          },
          {
            "name": "payment_settings_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "donation pages' payment settings id"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list_micro",
        "operationId": "getMicroDonationList",
        "method": "GET",
        "path": "/donations/micro",
        "summary": "List Micro Donations",
        "params": [
          {
            "name": "status",
            "in": "query",
            "required": false,
            "defaultValue": "paid",
            "schema": {
              "type": "string",
              "default": "paid",
              "enum": [
                "paid",
                "refund",
                "failed"
              ],
              "description": "what kind of Microdonations should be listed"
            }
          },
          {
            "name": "list",
            "in": "query",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string",
                "description": "field names. Gecerli degerler: details, name_surname, address, amount, sub_donation_type, birthday, email_status, complete_date, fundraising_campaign, tckno, tax_department, phone, donation_page, module, payment_method, added_by_id, f2f_group_id, fonzip_id, recurring_order_id, recurring_withdraw_count, recurring_total_withdraw_count, recurring_total_withdraw_amount, transaction_id, provision_no, auth_code, reference_id, ip_address, fundraising_campaign_user, api_tracking_id, news_via_phone, news_via_sms, news_via_email, application, card_number, receipt_no, donor_type, amount_visible, name_hidden, message, show_message, referring_name, referring_email, referring_phone, bank_account__name, payment_settings__name, recurring_cancel_reason, recurring_cancel_date, recurring_start_date, recurring_stop_date, cancelled_by_id"
              },
              "description": "which values should be listed"
            }
          },
          {
            "name": "category_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "default": null,
              "description": "donation category id, null for all"
            }
          },
          {
            "name": "no_category",
            "in": "query",
            "required": false,
            "schema": {
              "type": "boolean",
              "default": null,
              "description": "when true, return only donations that have no donation category assigned. Ignored if category_id is also supplied."
            }
          },
          {
            "name": "donation_page",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "donation page id"
            }
          },
          {
            "name": "fundraising_campaign",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "fundraising campaign id"
            }
          },
          {
            "name": "association_campaign_target",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "fundraising event id"
            }
          },
          {
            "name": "payment_settings_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "payment settings id"
            }
          },
          {
            "name": "bank_account_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "bank account id"
            }
          },
          {
            "name": "api_tracking_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "API Tracking ID"
            }
          },
          {
            "name": "order_by",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "default": "-transaction__complete_date",
              "enum": [
                "name",
                "-name",
                "transaction__amount",
                "-transaction__amount",
                "transaction__complete_date",
                "-transaction__complete_date"
              ],
              "description": "ordering"
            }
          },
          {
            "name": "recurring",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "default": -1,
              "description": "filter recurring donations - 1: only recurring, - 0: exclude recurring, - -1: list all",
              "enum": [
                1,
                0,
                -1
              ]
            }
          },
          {
            "name": "donor_type",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "default": null,
              "description": "filter donations by donor_type - null: all - personal: only personal donations - corporate: only corporate donations",
              "enum": [
                null,
                "personal",
                "corporate"
              ]
            }
          },
          {
            "name": "amount",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "payment/debt amount"
            }
          },
          {
            "name": "amt_cnd",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "default": null,
              "enum": [
                null,
                "!=",
                "<",
                "<=",
                ">",
                ">="
              ],
              "description": "amount condition if amount filter is present - null: equals to amount - !=: not equals to amount - <: smaller than amount - <=: smaller and equal to amount - \\>: bigger than amount - \\>=: bigger and equal to amount"
            }
          },
          {
            "name": "bin_number",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "card BIN number"
            }
          },
          {
            "name": "last_four",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "card last four digits"
            }
          },
          {
            "name": "query",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "search parameter. start with - (minus) char to exclude searched text"
            }
          },
          {
            "name": "start_date",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "Start date filtering for transaction__complete_date or complete_date fields. Must be before end_date."
            }
          },
          {
            "name": "end_date",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "End date filtering for transaction__complete_date or complete_date fields. Must be after start_date."
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          },
          {
            "name": "payment_method",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "enum": [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10
              ],
              "description": "payment type code - null: All - 0: Card - 1: Cash - 2: Wire Transfer - 3: POS - 4: SMS - 6: Postal Check - 7: Paypal - 8: BKM Express - 9: iDEAL - 10: Pay With Iyzico"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "report",
        "operationId": "getDonationReport",
        "method": "GET",
        "path": "/donations/report",
        "summary": "Get Donation Report",
        "params": [
          {
            "name": "start_date",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "Start date filtering for transaction__complete_date or complete_date fields. Must be before end_date."
            }
          },
          {
            "name": "end_date",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "End date filtering for transaction__complete_date or complete_date fields. Must be after start_date."
            }
          },
          {
            "name": "currency_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "currency id"
            }
          },
          {
            "name": "report_type",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "enum": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11
              ],
              "description": "report type - 1: donation category - 2: fundraising page - 3: fundraising campaign - 4: added by user - 5: donation form - 6: monthly donation status - 7: association campaign target - 8: fundraising team - 9: fundraising team campaign - 10: face to face group - 11: face to face group member"
            }
          },
          {
            "name": "aggregate",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "enum": [
                "true",
                "false"
              ],
              "description": "aggregate results"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "update_category",
        "operationId": "updateDonationCategory",
        "method": "PUT",
        "path": "/donation-category/{category_id}",
        "summary": "Update Donation Category",
        "params": [
          {
            "name": "category_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "name",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Donation/E-Card Category name"
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      },
      {
        "action": "update_category_status",
        "operationId": "updateDonationCategoryStatus",
        "method": "PATCH",
        "path": "/donation-category/{category_id}",
        "summary": "Update Donation Category Status",
        "params": [
          {
            "name": "category_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "active",
            "in": "body",
            "required": true,
            "schema": {
              "type": "boolean",
              "description": "true for active, false for passive"
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      }
    ]
  },
  {
    "name": "fonzip_monthly_donations",
    "description": "Duzenli (aylik) bagislar: tutar degisiklik talebi olusturma/yanitlama, kart guncelleme talebi gonderme, duzenli bagisi iptal etme.",
    "readOnly": false,
    "actions": [
      {
        "action": "cancel",
        "operationId": "cancelMonthlyDonation",
        "method": "PUT",
        "path": "/monthly-donations/{donation_id}/update-request",
        "summary": "Cancel Monthly Donation",
        "params": [
          {
            "name": "donation_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "action",
            "in": "body",
            "required": true,
            "schema": {
              "type": "string",
              "description": "must be \"cancel\""
            }
          },
          {
            "name": "reason",
            "in": "body",
            "required": true,
            "schema": {
              "type": "string",
              "description": "Cancellation reason"
            }
          },
          {
            "name": "send_cancellation_mail",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "True if you want to send email to donor after cancelling donation"
            }
          },
          {
            "name": "send_from_template",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "True if you want to send email from template"
            }
          },
          {
            "name": "template_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "Template ID to be sent"
            }
          },
          {
            "name": "save_as_template",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "True if you want to save message as template"
            }
          },
          {
            "name": "title",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Template Title"
            }
          },
          {
            "name": "subject",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Subject"
            }
          },
          {
            "name": "message",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Template content"
            }
          },
          {
            "name": "has_association_logo",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "True if mail includes the logo of association"
            }
          },
          {
            "name": "type_sms",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "True if template is for sms, False if template is for email"
            }
          },
          {
            "name": "background_color",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "background color in HEX format, such as"
            }
          },
          {
            "name": "body_color",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "text color in HEX format, such as"
            }
          },
          {
            "name": "footer_text_color",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "footer text color in HEX format, such as"
            }
          },
          {
            "name": "footer_icon_color",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "footer icon color in HEX format, such as"
            }
          },
          {
            "name": "has_button",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "whether a button is added or not"
            }
          },
          {
            "name": "btn_text",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "button text"
            }
          },
          {
            "name": "btn_color",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "button color in HEX format, such as"
            }
          },
          {
            "name": "btn_text_color",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "button text in HEX format, such as"
            }
          },
          {
            "name": "btn_operation",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "button operation. 1 for URL, 2 for Fonzip Related operation",
              "enum": [
                1,
                2
              ]
            }
          },
          {
            "name": "btn_operation_detail",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "button action detail",
              "enum": [
                "Any URL for operation 1",
                "login",
                "cc",
                "donation",
                "dues",
                "member_card"
              ]
            }
          },
          {
            "name": "translations",
            "in": "body",
            "required": false,
            "schema": {
              "type": "object",
              "description": "translations of template",
              "properties": {
                "language_code": {
                  "type": "object",
                  "properties": {
                    "subject": {
                      "type": "string"
                    },
                    "message": {
                      "type": "string"
                    },
                    "btn_text": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      },
      {
        "action": "change_values",
        "operationId": "changeMonthlyDonationValues",
        "method": "POST",
        "path": "/monthly-donations/{monthly_donation_order_id}",
        "summary": "Change Monthly Donation Values",
        "params": [
          {
            "name": "monthly_donation_order_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "description": "recurring_order_id of donation"
            }
          },
          {
            "name": "mode",
            "in": "body",
            "required": true,
            "schema": {
              "type": "string",
              "description": "Change Monthly Donation Attribute - date: changes next withdrawal date - category: changes donation category - amount: changes monthly donation amount - retry: retries withdrawal of donation",
              "enum": [
                "date",
                "category",
                "amount",
                "retry"
              ]
            }
          },
          {
            "name": "donation_id",
            "in": "body",
            "required": true,
            "schema": {
              "type": "integer",
              "description": "donation id"
            }
          },
          {
            "name": "recurring_next_cycle",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date",
              "description": "Next withdrawal date"
            }
          },
          {
            "name": "category_id",
            "in": "body",
            "required": false,
            "schema": {
              "description": "donation category id",
              "type": "integer"
            }
          },
          {
            "name": "amount",
            "in": "body",
            "required": false,
            "schema": {
              "type": "number",
              "format": "double",
              "description": "next withdrawal amount"
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      },
      {
        "action": "create_update_request",
        "operationId": "createMonthlyDonationUpdateRequest",
        "method": "POST",
        "path": "/user/{user_id}/monthly-donations/{donation_id}/update-request",
        "summary": "Create Monthly Donation Update Request",
        "params": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "donation_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "type",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Request Type - cancel: send cancellation request - amount: send amount upgrade requests",
              "enum": [
                "cancel",
                "amount"
              ]
            }
          },
          {
            "name": "value",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Reason if request type is 'cancel' New Amount if request type is 'amount'"
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      },
      {
        "action": "respond_amount_change_request",
        "operationId": "respondMonthlyDonationAmountChangeRequest",
        "method": "PATCH",
        "path": "/monthly-donations/{donation_id}/update-request",
        "summary": "Respond Monthly Donation Amount Change Request",
        "params": [
          {
            "name": "donation_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "approval",
            "in": "body",
            "required": true,
            "schema": {
              "type": "boolean",
              "description": "true if amount update request will be approved, false to reject"
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      },
      {
        "action": "send_card_update_request",
        "operationId": "sendCardUpdateRequestForMonthlyDonation",
        "method": "POST",
        "path": "/user/{user_id}/monthly-donations/{donation_id}/cc-update",
        "summary": "Send Card Update Request For Monthly Donation",
        "params": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "donation_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "mode",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Card Update Request mode - email: send email to donor with a card update link for monthly donation - sms: send sms to donor with a card update link for monthly donation",
              "enum": [
                "email",
                "sms"
              ]
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      }
    ]
  },
  {
    "name": "fonzip_membership_dues",
    "description": "Aidatlar ve borclar: aidat aboneliklerini listeleme/detay/silme, borc (debt) olusturma, guncelleme, durum degistirme ve silme.",
    "readOnly": false,
    "actions": [
      {
        "action": "create_debt",
        "operationId": "createDebt",
        "method": "POST",
        "path": "/debt",
        "summary": "Create Debt",
        "params": [
          {
            "name": "user_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "user id"
            }
          },
          {
            "name": "details",
            "in": "body",
            "required": false,
            "schema": {
              "description": "debt description",
              "type": "string"
            }
          },
          {
            "name": "amount",
            "in": "body",
            "required": false,
            "schema": {
              "type": "number",
              "format": "double",
              "description": "debt amount ( also payment amount if custom amount is 'custom'.)"
            }
          },
          {
            "name": "operation_date",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "Membership Due Operation Date"
            }
          },
          {
            "name": "bill_no",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "bill no"
            }
          },
          {
            "name": "recurring",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "if debt is recurring"
            }
          },
          {
            "name": "period",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date",
              "description": "Period Date"
            }
          },
          {
            "name": "recurring_period",
            "in": "body",
            "required": false,
            "schema": {
              "type": "number",
              "description": "Recurring period in days"
            }
          },
          {
            "name": "due_date",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "Debts Due Date"
            }
          },
          {
            "name": "add_payment",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "add the payment after adding the debt"
            }
          },
          {
            "name": "custom_amount",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "amount for payment. total_debt for users total debt, custom for custom debt amount",
              "enum": [
                "total_debt",
                "custom"
              ]
            }
          },
          {
            "name": "send_mail",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "send mail after adding the debt"
            }
          },
          {
            "name": "thanks_mail_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "mail template to be sent after adding the debt"
            }
          },
          {
            "name": "payment_method_select",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "payment type selection. must be other for API",
              "default": "other",
              "enum": [
                "other",
                "card"
              ]
            }
          },
          {
            "name": "payment_method",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "payment type code - 0: Card - 1: Cash - 2: Wire Transfer - 3: POS - 4: SMS - 6: Postal Check - 7: Paypal - 8: BKM Express - 9: iDEAL - 10: Pay With Iyzico",
              "enum": [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10
              ]
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      },
      {
        "action": "delete",
        "operationId": "deleteMembershipDue",
        "method": "DELETE",
        "path": "/subscription/{subscription_id}",
        "summary": "Delete Membership Due",
        "params": [
          {
            "name": "subscription_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "delete_debt",
        "operationId": "deleteDebt",
        "method": "DELETE",
        "path": "/debt/{debt_id}",
        "summary": "Delete Debt",
        "params": [
          {
            "name": "debt_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "get",
        "operationId": "getMembershipDueDetails",
        "method": "GET",
        "path": "/subscription/{subscription_id}",
        "summary": "Get Membership Due Details",
        "params": [
          {
            "name": "subscription_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "get_debt",
        "operationId": "getDebtDetails",
        "method": "GET",
        "path": "/debt/{debt_id}",
        "summary": "Get Debt Details",
        "params": [
          {
            "name": "debt_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list",
        "operationId": "getMembershipDuesList",
        "method": "GET",
        "path": "/subscriptions",
        "summary": "List Membership Dues",
        "params": [
          {
            "name": "status",
            "in": "query",
            "required": false,
            "defaultValue": "paid",
            "schema": {
              "type": "string",
              "default": "paid",
              "enum": [
                "paid",
                "refund",
                "failed"
              ],
              "description": "what kind of membership dues should be listed - paid: for payments - refund: for refunds - failed: for failed payment transactions"
            }
          },
          {
            "name": "period_year",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "default": null,
              "description": "Dues Period Year"
            }
          },
          {
            "name": "period_month",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "default": null,
              "description": "Dues Period Month"
            }
          },
          {
            "name": "amount",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "payment/debt amount"
            }
          },
          {
            "name": "amt_cnd",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "default": null,
              "enum": [
                null,
                "!=",
                "<",
                "<=",
                ">",
                ">="
              ],
              "description": "amount condition if amount filter is present - null: equals to amount - !=: not equals to amount - <: smaller than amount - <=: smaller and equal to amount - \\>: bigger than amount - \\>=: bigger and equal to amount"
            }
          },
          {
            "name": "bin_number",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "card BIN number"
            }
          },
          {
            "name": "last_four",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "card last four digits"
            }
          },
          {
            "name": "installment_count",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "installment count"
            }
          },
          {
            "name": "tag_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "Tag id of user"
            }
          },
          {
            "name": "order_by",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "default": "-transaction__complete_date",
              "enum": [
                "id",
                "-id",
                "user__name",
                "-user__name",
                "transaction__amount",
                "-transaction__amount",
                "transaction__complete_date",
                "-transaction__complete_date"
              ],
              "description": "ordering"
            }
          },
          {
            "name": "membership_no",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "Membership number of user"
            }
          },
          {
            "name": "added_by_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "User id who added the payment"
            }
          },
          {
            "name": "added_by__name",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "maxLength": 100,
              "description": "User name (case-insensitive, unaccented) who added the payment. Used when added_by_id is not known."
            }
          },
          {
            "name": "create_date",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "Record creation date filter"
            }
          },
          {
            "name": "create_date_cnd",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "default": null,
              "enum": [
                null,
                "<",
                ">"
              ],
              "description": "Record creation date filter condition"
            }
          },
          {
            "name": "query",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "search parameter. start with - (minus) char to exclude searched text"
            }
          },
          {
            "name": "start_date",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "Start date filtering for transaction__complete_date or complete_date fields. Must be before end_date."
            }
          },
          {
            "name": "end_date",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "End date filtering for transaction__complete_date or complete_date fields. Must be after start_date."
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          },
          {
            "name": "payment_method",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "enum": [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10
              ],
              "description": "payment type code - null: All - 0: Card - 1: Cash - 2: Wire Transfer - 3: POS - 4: SMS - 6: Postal Check - 7: Paypal - 8: BKM Express - 9: iDEAL - 10: Pay With Iyzico"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list_debts",
        "operationId": "getMembershipDueDebtsList",
        "method": "GET",
        "path": "/debts",
        "summary": "List Membership Due Debts",
        "params": [
          {
            "name": "status",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "default": null,
              "enum": [
                null,
                1,
                6,
                8
              ],
              "description": "what kind of membership due debts should be listed - null: All records - 1: Nonpaid debt - 6: Removed/Inactive debt - 8: Paid debt"
            }
          },
          {
            "name": "period_year",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "default": null,
              "description": "Dues Period Year"
            }
          },
          {
            "name": "period_month",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "default": null,
              "description": "Dues Period Month"
            }
          },
          {
            "name": "amount",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "payment/debt amount"
            }
          },
          {
            "name": "amt_cnd",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "default": null,
              "enum": [
                null,
                "!=",
                "<",
                "<=",
                ">",
                ">="
              ],
              "description": "amount condition if amount filter is present - null: equals to amount - !=: not equals to amount - <: smaller than amount - <=: smaller and equal to amount - \\>: bigger than amount - \\>=: bigger and equal to amount"
            }
          },
          {
            "name": "operation_date",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "Membership Due Operation Date"
            }
          },
          {
            "name": "membership_no",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "Membership number of user"
            }
          },
          {
            "name": "tag_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "Tag id of user"
            }
          },
          {
            "name": "added_by_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "User id who added the debt"
            }
          },
          {
            "name": "added_by__name",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "maxLength": 100,
              "description": "User name (case-insensitive, unaccented) who added the debt. Used when added_by_id is not known."
            }
          },
          {
            "name": "create_date",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "Record creation date filter"
            }
          },
          {
            "name": "create_date_cnd",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "default": null,
              "enum": [
                null,
                "<",
                ">"
              ],
              "description": "Record creation date filter condition"
            }
          },
          {
            "name": "possible_duplicate",
            "in": "query",
            "required": false,
            "schema": {
              "type": "boolean",
              "default": null,
              "description": "When true, returns only debts whose (user, period, amount) tuple appears more than once in the association's debts."
            }
          },
          {
            "name": "order_by",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "default": "-operation_date",
              "enum": [
                "id",
                "-id",
                "period",
                "-period",
                "amount",
                "-amount",
                "operation_date",
                "-operation_date",
                "create_date",
                "-create_date"
              ],
              "description": "ordering"
            }
          },
          {
            "name": "query",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "search parameter. start with - (minus) char to exclude searched text"
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "update_debt",
        "operationId": "updateDebt",
        "method": "PUT",
        "path": "/debt/{debt_id}",
        "summary": "Update Debt",
        "params": [
          {
            "name": "debt_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "period",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date",
              "description": "Period Date"
            }
          },
          {
            "name": "details",
            "in": "body",
            "required": false,
            "schema": {
              "description": "debt description",
              "type": "string"
            }
          },
          {
            "name": "remove_note",
            "in": "body",
            "required": false,
            "schema": {
              "description": "remove debt description for removed debt status",
              "type": "string"
            }
          },
          {
            "name": "operation_date",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "Membership Due Operation Date"
            }
          },
          {
            "name": "bill_no",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "bill no"
            }
          },
          {
            "name": "due_date",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "Debts Due Date"
            }
          },
          {
            "name": "recurring_period",
            "in": "body",
            "required": false,
            "schema": {
              "type": "number",
              "description": "Recurring period in days"
            }
          },
          {
            "name": "transaction",
            "in": "body",
            "required": false,
            "schema": {
              "type": "object",
              "properties": {
                "amount": {
                  "type": "number",
                  "format": "double",
                  "description": "debt amount"
                },
                "transaction_id": {
                  "type": "string",
                  "description": "bank transaction id / wire transfer query no"
                },
                "payment_method": {
                  "type": "integer",
                  "description": "payment type code - 0: Card - 1: Cash - 2: Wire Transfer - 3: POS - 4: SMS - 6: Postal Check - 7: Paypal - 8: BKM Express - 9: iDEAL - 10: Pay With Iyzico",
                  "enum": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10
                  ]
                }
              }
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      },
      {
        "action": "update_debt_status",
        "operationId": "updateDebtStatus",
        "method": "PATCH",
        "path": "/debt/{debt_id}",
        "summary": "Update Debt Status",
        "params": [
          {
            "name": "debt_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "action",
            "in": "body",
            "required": true,
            "schema": {
              "type": "string",
              "description": "action to apply to the debt - remove: removes the debt - activate: activates the debt",
              "enum": [
                "remove",
                "activate"
              ]
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      }
    ]
  },
  {
    "name": "fonzip_events",
    "description": "Etkinlikler: etkinlik olusturma, guncelleme, durum degistirme, silme; bilet tanimlari; bilet satislari ve satis detaylari.",
    "readOnly": false,
    "actions": [
      {
        "action": "create",
        "operationId": "createEvent",
        "method": "POST",
        "path": "/event",
        "summary": "Create Event",
        "params": [
          {
            "name": "name",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Event name"
            }
          },
          {
            "name": "url",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Event URL"
            }
          },
          {
            "name": "venue",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "Event venue"
            }
          },
          {
            "name": "address",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Event address"
            }
          },
          {
            "name": "details",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Event details"
            }
          },
          {
            "name": "paid_event",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "Event has paid tickets"
            }
          },
          {
            "name": "payment_settings_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "Payment settings id"
            }
          },
          {
            "name": "image",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "url",
              "description": "Event image url"
            }
          },
          {
            "name": "start_date",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "Event start date"
            }
          },
          {
            "name": "all_day",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "Event takes all day"
            }
          },
          {
            "name": "end_date",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "Event end date"
            }
          },
          {
            "name": "ticket_types",
            "in": "body",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "description": "Ticket id",
                    "type": "integer"
                  }
                }
              }
            }
          },
          {
            "name": "max_installment",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "maximum number of installments for event"
            }
          },
          {
            "name": "send_reminder",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "should a reminder sent to the participants one day before the event"
            }
          },
          {
            "name": "ask_billing_info",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "additional billing info is required or not"
            }
          },
          {
            "name": "location",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "Whether event is held online or at a venue <br> - 0: Venue <br> - 1: Online",
              "enum": [
                0,
                1
              ]
            }
          },
          {
            "name": "sender_account_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "Email sender account id for event"
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      },
      {
        "action": "create_ticket",
        "operationId": "createTicket",
        "method": "POST",
        "path": "/ticket",
        "summary": "Create Ticket",
        "params": [
          {
            "name": "title",
            "in": "body",
            "required": true,
            "schema": {
              "description": "Ticket name",
              "type": "string"
            }
          },
          {
            "name": "price",
            "in": "body",
            "required": false,
            "schema": {
              "description": "Price",
              "type": "number",
              "format": "double"
            }
          },
          {
            "name": "ticket_type",
            "in": "body",
            "required": false,
            "schema": {
              "description": "Ticket type - paid: paid ticket - free: free ticket",
              "type": "string",
              "enum": [
                "paid",
                "free"
              ]
            }
          },
          {
            "name": "details",
            "in": "body",
            "required": false,
            "schema": {
              "description": "ticket description",
              "type": "string"
            }
          },
          {
            "name": "post_sale_message",
            "in": "body",
            "required": false,
            "schema": {
              "description": "message to be shown after the ticket is purchased",
              "type": "string"
            }
          },
          {
            "name": "sales_start_on_date",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "true if ticket sale must start on specific date"
            }
          },
          {
            "name": "sales_start",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "Ticket sale start date"
            }
          },
          {
            "name": "sales_end_on_date",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "true if ticket sale must end on specific date"
            }
          },
          {
            "name": "sales_end",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "Ticket sale end date"
            }
          },
          {
            "name": "max_per_person",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "maximum number of tickets a user can buy"
            }
          },
          {
            "name": "tag_control",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "ticket can only be bought by users with selected tags - 0: No control - 1: Ok if user has any of the selected tags - 2: Ok if user has all of the selected tags",
              "enum": [
                0,
                1,
                2
              ]
            }
          },
          {
            "name": "tags_to_control",
            "in": "body",
            "required": false,
            "schema": {
              "type": "array",
              "description": "tag_id's for tag control",
              "items": {
                "type": "integer"
              }
            }
          },
          {
            "name": "member_with_no_debt",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "true if ticket can only be bought by users with no debt"
            }
          },
          {
            "name": "related_with_no_debt",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "true if ticket can only be bought if users related organization has no debt"
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      },
      {
        "action": "delete",
        "operationId": "deleteEvent",
        "method": "DELETE",
        "path": "/event/{event_id}",
        "summary": "Delete Event",
        "params": [
          {
            "name": "event_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "delete_ticket",
        "operationId": "deleteTicket",
        "method": "DELETE",
        "path": "/ticket/{ticket_id}",
        "summary": "Delete Ticket",
        "params": [
          {
            "name": "ticket_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "get",
        "operationId": "getEventDetails",
        "method": "GET",
        "path": "/event/{event_id}",
        "summary": "Get Event Details",
        "params": [
          {
            "name": "event_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "get_ticket",
        "operationId": "getTicketDetails",
        "method": "GET",
        "path": "/ticket/{ticket_id}",
        "summary": "Get Ticket Details",
        "params": [
          {
            "name": "ticket_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "get_ticket_sale",
        "operationId": "getTicketSaleDetails",
        "method": "GET",
        "path": "/ticket-sale/{ticket_sale_id}",
        "summary": "Get Ticket Sale Details",
        "params": [
          {
            "name": "ticket_sale_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list",
        "operationId": "getEventList",
        "method": "GET",
        "path": "/events",
        "summary": "List Events",
        "params": [
          {
            "name": "query",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "search parameter. start with - (minus) char to exclude searched text"
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          },
          {
            "name": "target",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "default": "a",
              "enum": [
                "a",
                "p",
                "u"
              ],
              "description": "filter based on past or upcoming events - a: all - p: past - u: upcoming"
            }
          },
          {
            "name": "order_by",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "default": "start_date",
              "enum": [
                "start_date",
                "-start_date",
                "name",
                "-name",
                "id",
                "-id"
              ],
              "description": "ordering"
            }
          },
          {
            "name": "archived",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "default": null,
              "enum": [
                null,
                true
              ],
              "description": "true for archived records, null for normal records"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list_ticket_sales",
        "operationId": "getTicketSaleList",
        "method": "GET",
        "path": "/ticket-sales",
        "summary": "List Ticket Sales",
        "params": [
          {
            "name": "query",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "search parameter. start with - (minus) char to exclude searched text"
            }
          },
          {
            "name": "start_date",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "Start date filtering for transaction__complete_date or complete_date fields. Must be before end_date."
            }
          },
          {
            "name": "end_date",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "End date filtering for transaction__complete_date or complete_date fields. Must be after start_date."
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          },
          {
            "name": "payment_method",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "enum": [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10
              ],
              "description": "payment type code - null: All - 0: Card - 1: Cash - 2: Wire Transfer - 3: POS - 4: SMS - 6: Postal Check - 7: Paypal - 8: BKM Express - 9: iDEAL - 10: Pay With Iyzico"
            }
          },
          {
            "name": "time_selection",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "enum": [
                0,
                1
              ],
              "description": "date time range selection, 0 for date range selection (start_date & end_date must be present), 1 for all time (event_id must be present)."
            }
          },
          {
            "name": "event_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "to filter sales depending on event"
            }
          },
          {
            "name": "amount",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "payment/debt amount"
            }
          },
          {
            "name": "amt_cnd",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "default": null,
              "enum": [
                null,
                "!=",
                "<",
                "<=",
                ">",
                ">="
              ],
              "description": "amount condition if amount filter is present - null: equals to amount - !=: not equals to amount - <: smaller than amount - <=: smaller and equal to amount - \\>: bigger than amount - \\>=: bigger and equal to amount"
            }
          },
          {
            "name": "bin_number",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "card BIN number"
            }
          },
          {
            "name": "last_four",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "card last four digits"
            }
          },
          {
            "name": "installment_count",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "installment count"
            }
          },
          {
            "name": "payment_settings_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "payment system id"
            }
          },
          {
            "name": "status",
            "in": "query",
            "required": false,
            "defaultValue": "paid",
            "schema": {
              "type": "string",
              "default": "paid",
              "enum": [
                "paid",
                "refund",
                "failed"
              ],
              "description": "what kind of ticket sales should be listed"
            }
          },
          {
            "name": "order_by",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "default": "-transaction__complete_date",
              "enum": [
                "id",
                "-id",
                "transaction__amount",
                "-transaction__amount",
                "transaction__complete_date",
                "-transaction__complete_date"
              ],
              "description": "ordering"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "update",
        "operationId": "updateEvent",
        "method": "PUT",
        "path": "/event/{event_id}",
        "summary": "Update Event",
        "params": [
          {
            "name": "event_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "name",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Event name"
            }
          },
          {
            "name": "url",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Event URL"
            }
          },
          {
            "name": "venue",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "Event venue"
            }
          },
          {
            "name": "address",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Event address"
            }
          },
          {
            "name": "details",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Event details"
            }
          },
          {
            "name": "paid_event",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "Event has paid tickets"
            }
          },
          {
            "name": "payment_settings_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "Payment settings id"
            }
          },
          {
            "name": "image",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "url",
              "description": "Event image url"
            }
          },
          {
            "name": "start_date",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "Event start date"
            }
          },
          {
            "name": "all_day",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "Event takes all day"
            }
          },
          {
            "name": "end_date",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "Event end date"
            }
          },
          {
            "name": "ticket_types",
            "in": "body",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "description": "Ticket id",
                    "type": "integer"
                  }
                }
              }
            }
          },
          {
            "name": "max_installment",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "maximum number of installments for event"
            }
          },
          {
            "name": "send_reminder",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "should a reminder sent to the participants one day before the event"
            }
          },
          {
            "name": "ask_billing_info",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "additional billing info is required or not"
            }
          },
          {
            "name": "location",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "Whether event is held online or at a venue <br> - 0: Venue <br> - 1: Online",
              "enum": [
                0,
                1
              ]
            }
          },
          {
            "name": "sender_account_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "Email sender account id for event"
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      },
      {
        "action": "update_status",
        "operationId": "updateEventStatus",
        "method": "PATCH",
        "path": "/event/{event_id}",
        "summary": "Update Event Status",
        "params": [
          {
            "name": "event_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "active",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "true if event is active, false if event is passive"
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      },
      {
        "action": "update_ticket",
        "operationId": "updateTicket",
        "method": "PUT",
        "path": "/ticket/{ticket_id}",
        "summary": "Update Ticket",
        "params": [
          {
            "name": "ticket_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "title",
            "in": "body",
            "required": true,
            "schema": {
              "description": "Ticket name",
              "type": "string"
            }
          },
          {
            "name": "price",
            "in": "body",
            "required": false,
            "schema": {
              "description": "Price",
              "type": "number",
              "format": "double"
            }
          },
          {
            "name": "ticket_type",
            "in": "body",
            "required": false,
            "schema": {
              "description": "Ticket type - paid: paid ticket - free: free ticket",
              "type": "string",
              "enum": [
                "paid",
                "free"
              ]
            }
          },
          {
            "name": "details",
            "in": "body",
            "required": false,
            "schema": {
              "description": "ticket description",
              "type": "string"
            }
          },
          {
            "name": "post_sale_message",
            "in": "body",
            "required": false,
            "schema": {
              "description": "message to be shown after the ticket is purchased",
              "type": "string"
            }
          },
          {
            "name": "sales_start_on_date",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "true if ticket sale must start on specific date"
            }
          },
          {
            "name": "sales_start",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "Ticket sale start date"
            }
          },
          {
            "name": "sales_end_on_date",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "true if ticket sale must end on specific date"
            }
          },
          {
            "name": "sales_end",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "Ticket sale end date"
            }
          },
          {
            "name": "max_per_person",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "maximum number of tickets a user can buy"
            }
          },
          {
            "name": "tag_control",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "ticket can only be bought by users with selected tags - 0: No control - 1: Ok if user has any of the selected tags - 2: Ok if user has all of the selected tags",
              "enum": [
                0,
                1,
                2
              ]
            }
          },
          {
            "name": "tags_to_control",
            "in": "body",
            "required": false,
            "schema": {
              "type": "array",
              "description": "tag_id's for tag control",
              "items": {
                "type": "integer"
              }
            }
          },
          {
            "name": "member_with_no_debt",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "true if ticket can only be bought by users with no debt"
            }
          },
          {
            "name": "related_with_no_debt",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "true if ticket can only be bought if users related organization has no debt"
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      }
    ]
  },
  {
    "name": "fonzip_fundraising",
    "description": "Bagis toplama: kampanyalar (fundraising campaign), kampanya etkinlikleri (fundraising event) ve takimlar (fundraising team) ile takimlara bagli kampanyalar.",
    "readOnly": false,
    "actions": [
      {
        "action": "create",
        "operationId": "createFundraisingCampaign",
        "method": "POST",
        "path": "/fundraising-campaigns",
        "summary": "Create Fundraising Campaign",
        "params": [
          {
            "name": "id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "Fundraising campaign id"
            }
          },
          {
            "name": "user_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "userid"
            }
          },
          {
            "name": "title",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "campaign title"
            }
          },
          {
            "name": "url",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "campaign url"
            }
          },
          {
            "name": "image",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "url",
              "description": "campaign image url"
            }
          },
          {
            "name": "personal_message",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "campaign message"
            }
          },
          {
            "name": "user_note",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "users note"
            }
          },
          {
            "name": "has_target",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "campaign has target"
            }
          },
          {
            "name": "hide_total_donation",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "total donations is hidden or not"
            }
          },
          {
            "name": "hide_donor_list",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "donor list is hidden or not"
            }
          },
          {
            "name": "target",
            "in": "body",
            "required": false,
            "schema": {
              "type": "number",
              "format": "double",
              "description": "campaign target"
            }
          },
          {
            "name": "target_currency_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "number",
              "description": "fundraising campaign target currency id"
            }
          },
          {
            "name": "status",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "campaign status <br> - 0: waiting approval <br> - 1: approved <br> - 2: rejected <br> - 3: finalized <br> - 4: deleted <br> - 5: waiting extra approval <br> - 7: archived",
              "enum": [
                0,
                1,
                2,
                3,
                4,
                5,
                7
              ]
            }
          },
          {
            "name": "has_special_date",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "True if campaign has a event date like birthday, memorial day etc."
            }
          },
          {
            "name": "event_date",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date",
              "description": "Event date"
            }
          },
          {
            "name": "bank_account_list",
            "in": "body",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "description": "Bank Account Id",
                    "type": "integer"
                  },
                  "name": {
                    "description": "Bank Account name",
                    "type": "string"
                  },
                  "bank_name": {
                    "description": "Bank name",
                    "type": "string"
                  },
                  "iban": {
                    "description": "IBAN",
                    "type": "string"
                  },
                  "details": {
                    "description": "Additional details",
                    "type": "string"
                  },
                  "currency_id": {
                    "description": "Accounts Currency ID",
                    "type": "integer"
                  },
                  "currency__display": {
                    "description": "Currency Display",
                    "type": "string"
                  },
                  "business_account": {
                    "description": "True if payment settings belongs to business account",
                    "type": "boolean"
                  },
                  "create_date": {
                    "type": "string",
                    "format": "date-time",
                    "description": "create date"
                  },
                  "created_by_id": {
                    "description": "Account created by user id",
                    "type": "integer"
                  },
                  "created_by__name": {
                    "description": "Account created by user name",
                    "type": "string"
                  },
                  "update_date": {
                    "type": "string",
                    "format": "date-time",
                    "description": "update date"
                  },
                  "updated_by_id": {
                    "description": "Account last updated by user id",
                    "type": "integer"
                  },
                  "updated_by__name": {
                    "description": "Account last updated by user name",
                    "type": "string"
                  }
                }
              }
            }
          },
          {
            "name": "phone_show",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "true if phone is asked"
            }
          },
          {
            "name": "phone_required",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "true if phone is required"
            }
          },
          {
            "name": "birthday_show",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "true if birthday is asked"
            }
          },
          {
            "name": "birthday_required",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "true if birthday is required"
            }
          },
          {
            "name": "address_show",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "true if address is asked"
            }
          },
          {
            "name": "address_required",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "true if address is required"
            }
          },
          {
            "name": "tckno_show",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "true if tckno is asked"
            }
          },
          {
            "name": "tckno_required",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "true if tckno is required"
            }
          },
          {
            "name": "message_show",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "true if donors may leave a message. Ships enabled, unlike the other *_show flags"
            }
          },
          {
            "name": "sub_donation_type_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "donation category id"
            }
          },
          {
            "name": "thanks_mail_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "thanks mail id"
            }
          },
          {
            "name": "payment_settings_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "payment system id"
            }
          },
          {
            "name": "currencies",
            "in": "body",
            "required": false,
            "schema": {
              "type": "array",
              "description": "valid currencies",
              "items": {
                "type": "integer",
                "description": "currency id"
              }
            }
          },
          {
            "name": "certificate_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "certificate"
            }
          },
          {
            "name": "thanks_sms_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "thanks sms id"
            }
          },
          {
            "name": "referral_certificate_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "referral certificate id"
            }
          },
          {
            "name": "referral_thanks_mail_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "referral thanks mail id"
            }
          },
          {
            "name": "association_campaign_target_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "fundraising event id"
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": false
      },
      {
        "action": "create_event",
        "operationId": "createFundraisingEvent",
        "method": "POST",
        "path": "/fundraising-event",
        "summary": "Create Fundraising Event",
        "params": [
          {
            "name": "id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "fundraising event id"
            }
          },
          {
            "name": "title",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "fundraising event name"
            }
          },
          {
            "name": "target",
            "in": "body",
            "required": false,
            "schema": {
              "type": "number",
              "format": "double",
              "description": "fundraising event target"
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": false
      },
      {
        "action": "create_team",
        "operationId": "createFundraisingTeam",
        "method": "POST",
        "path": "/fundraising-teams",
        "summary": "Create Fundraising Team",
        "params": [
          {
            "name": "user_id",
            "in": "body",
            "required": true,
            "schema": {
              "type": "integer",
              "description": "user id"
            }
          },
          {
            "name": "image",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "campaign image url"
            }
          },
          {
            "name": "currency_id",
            "in": "body",
            "required": false,
            "schema": {
              "description": "Fundraising team default Currency ID",
              "type": "integer"
            }
          },
          {
            "name": "title",
            "in": "body",
            "required": true,
            "schema": {
              "description": "Fundraising team title",
              "type": "string"
            }
          },
          {
            "name": "details",
            "in": "body",
            "required": true,
            "schema": {
              "description": "Fundraising team description",
              "type": "string"
            }
          },
          {
            "name": "campaign",
            "in": "body",
            "required": true,
            "schema": {
              "type": "object",
              "required": [
                "title"
              ],
              "properties": {
                "title": {
                  "description": "Fundraising teams' campaign title",
                  "type": "string"
                },
                "has_target": {
                  "type": "boolean",
                  "description": "true if campaign has target"
                },
                "target": {
                  "type": "number",
                  "description": "campaign target"
                },
                "target_currency_id": {
                  "type": "number",
                  "description": "campaign target currency id"
                }
              }
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      },
      {
        "action": "create_team_campaign",
        "operationId": "createFundraisingTeamCampaign",
        "method": "POST",
        "path": "/fundraising-team/{team_id}/campaigns",
        "summary": "Create Fundraising Team Campaign",
        "params": [
          {
            "name": "team_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "default",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "Fundraising team campaign is currently active & default"
            }
          },
          {
            "name": "title",
            "in": "body",
            "required": true,
            "schema": {
              "description": "Fundraising teams' campaign title",
              "type": "string"
            }
          },
          {
            "name": "has_target",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "true if campaign has target"
            }
          },
          {
            "name": "target",
            "in": "body",
            "required": false,
            "schema": {
              "type": "number",
              "description": "campaign target"
            }
          },
          {
            "name": "target_currency_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "number",
              "description": "campaign target currency id"
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      },
      {
        "action": "delete",
        "operationId": "deleteFundraisingCampaign",
        "method": "DELETE",
        "path": "/fundraising-campaign/{campaign_id}",
        "summary": "Delete Fundraising Campaign",
        "params": [
          {
            "name": "campaign_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "delete_event",
        "operationId": "deleteFundraisingEvent",
        "method": "DELETE",
        "path": "/fundraising-event/{event_id}",
        "summary": "Delete Fundraising Event",
        "params": [
          {
            "name": "event_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "delete_team",
        "operationId": "deleteFundraisingTeam",
        "method": "DELETE",
        "path": "/fundraising-team/{team_id}",
        "summary": "Delete Fundraising Team",
        "params": [
          {
            "name": "team_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "delete_team_campaign",
        "operationId": "deleteFundraisingTeamCampaign",
        "method": "DELETE",
        "path": "/fundraising-team/{team_id}/campaign/{campaign_id}",
        "summary": "Delete Fundraising Team Campaign",
        "params": [
          {
            "name": "team_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "campaign_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "get",
        "operationId": "getFundraisingCampaignDetails",
        "method": "GET",
        "path": "/fundraising-campaign/{campaign_id}",
        "summary": "Get Fundraising Campaign Details",
        "params": [
          {
            "name": "campaign_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "get_team",
        "operationId": "getFundraisingTeamDetail",
        "method": "GET",
        "path": "/fundraising-team/{team_id}",
        "summary": "Get Fundraising Team Detail",
        "params": [
          {
            "name": "team_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list",
        "operationId": "getFundraisingCampaignList",
        "method": "GET",
        "path": "/fundraising-campaigns",
        "summary": "List Fundraising Campaigns",
        "params": [
          {
            "name": "query",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "search parameter. start with - (minus) char to exclude searched text"
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          },
          {
            "name": "order_by",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "enum": [
                "user__name",
                "-user__name",
                "title",
                "-title",
                "create_date",
                "-create_date",
                "activation_date",
                "-activation_date",
                "donation_total",
                "-donation_total"
              ],
              "description": "ordering"
            }
          },
          {
            "name": "status",
            "in": "query",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "integer",
                "enum": [
                  0,
                  1,
                  7,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "description": "fundraising campaign status list - 0: waiting approval - 1: approved - 2: rejected - 3: finalized - 4: deleted - 5: waiting extra approval - 7: archived"
            }
          },
          {
            "name": "category_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "fundraising campaigns' donation category id"
            }
          },
          {
            "name": "team_campaign_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "fundraising campaign teams' campaign id"
            }
          },
          {
            "name": "payment_settings_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "fundraising campaigns' payment settings id"
            }
          },
          {
            "name": "association_campaign_target_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "fundraising campaigns' fundraising event id"
            }
          },
          {
            "name": "create_date",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "create date filter"
            }
          },
          {
            "name": "create_date_cnd",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "default": null,
              "enum": [
                null,
                "<",
                ">"
              ],
              "description": "create date filter condition"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list_events",
        "operationId": "getFundraisingEvents",
        "method": "GET",
        "path": "/fundraising-events",
        "summary": "List Fundraising Events",
        "params": [],
        "bodyRequired": false
      },
      {
        "action": "list_team_campaigns",
        "operationId": "getFundraisingTeamsCampaigns",
        "method": "GET",
        "path": "/fundraising-team/{team_id}/campaigns",
        "summary": "List Fundraising Teams Campaigns",
        "params": [
          {
            "name": "team_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list_teams",
        "operationId": "getFundraisingTeams",
        "method": "GET",
        "path": "/fundraising-teams",
        "summary": "List Fundraising Teams",
        "params": [
          {
            "name": "query",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "search parameter. start with - (minus) char to exclude searched text"
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          },
          {
            "name": "order_by",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "default": "title",
              "enum": [
                "title",
                "-title",
                "create_date",
                "-create_date",
                "user__name",
                "-user__name",
                "-id",
                "id"
              ],
              "description": "ordering"
            }
          },
          {
            "name": "status",
            "in": "query",
            "required": false,
            "schema": {
              "type": "number",
              "enum": [
                0,
                1,
                2,
                3,
                4,
                5
              ],
              "description": "fundraising team status - 0: waiting approval - 1: approved - 2: rejected - 3: waiting extra approval - 4: deleted - 5: archived"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "update",
        "operationId": "updateFundraisingCampaign",
        "method": "PUT",
        "path": "/fundraising-campaign/{campaign_id}",
        "summary": "Update Fundraising Campaign",
        "params": [
          {
            "name": "campaign_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "multiple",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "true if updating multiple fields"
            }
          },
          {
            "name": "field",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "field to be updated. Gecerli degerler: title, image, bank_account_list, personal_message, has_target, hide_donor_list, hide_total_donation, has_special_date, phone_show, phone_required, birthday_show, birthday_required, address_show, address_required, tckno_show, tckno_required, message_show, has_target, has_special_date, target, event_date, sub_donation_type_id, payment_settings_id, thanks_mail_id, referral_thanks_mail_id, thanks_sms_id, certificate_id, referral_certificate_id, association_campaign_target_id"
            }
          },
          {
            "name": "value",
            "in": "body",
            "required": false,
            "schema": {
              "oneOf": [
                {
                  "type": "string"
                },
                {
                  "type": "number"
                },
                {
                  "type": "boolean"
                },
                {
                  "type": "array"
                },
                {
                  "type": "string",
                  "format": "date-time"
                }
              ]
            }
          },
          {
            "name": "data",
            "in": "body",
            "required": false,
            "schema": {
              "type": "object",
              "description": "key value pairs of fields and values (see example)"
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": false
      },
      {
        "action": "update_event",
        "operationId": "updateFundraisingEvent",
        "method": "PUT",
        "path": "/fundraising-event/{event_id}",
        "summary": "Update Fundraising Event",
        "params": [
          {
            "name": "event_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "fundraising event id"
            }
          },
          {
            "name": "title",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "fundraising event name"
            }
          },
          {
            "name": "target",
            "in": "body",
            "required": false,
            "schema": {
              "type": "number",
              "format": "double",
              "description": "fundraising event target"
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": false
      },
      {
        "action": "update_status",
        "operationId": "updateFundraisingCampaignStatus",
        "method": "PATCH",
        "path": "/fundraising-campaign/{campaign_id}",
        "summary": "Update Fundraising Campaign Status",
        "params": [
          {
            "name": "campaign_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "action",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "set status of fundraising campaign - reactivate: reactivate finalized campaign - finalize: finalize active campaign - featured: toggle the featured flag on the campaign (requires `featured` body field; up to 6 campaigns per association may be featured; only active campaigns are eligible)",
              "enum": [
                "reactivate",
                "finalize",
                "featured"
              ]
            }
          },
          {
            "name": "featured",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "Required when `action=featured`. Pass `true` to add the campaign to the Featured Campaigns block, `false` to remove it. Adding beyond the 6-campaign cap responds with HTTP 400."
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": false
      },
      {
        "action": "update_team",
        "operationId": "updateFundraisingTeam",
        "method": "PUT",
        "path": "/fundraising-team/{team_id}",
        "summary": "Update Fundraising Team",
        "params": [
          {
            "name": "team_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "user_id",
            "in": "body",
            "required": true,
            "schema": {
              "type": "integer",
              "description": "user id"
            }
          },
          {
            "name": "image",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "campaign image url"
            }
          },
          {
            "name": "currency_id",
            "in": "body",
            "required": true,
            "schema": {
              "description": "Fundraising team default Currency ID",
              "type": "integer"
            }
          },
          {
            "name": "title",
            "in": "body",
            "required": true,
            "schema": {
              "description": "Fundraising team title",
              "type": "string"
            }
          },
          {
            "name": "details",
            "in": "body",
            "required": true,
            "schema": {
              "description": "Fundraising team description",
              "type": "string"
            }
          },
          {
            "name": "status",
            "in": "body",
            "required": false,
            "schema": {
              "type": "number",
              "description": "fundraising team status - 0: waiting approval - 1: approved - 2: rejected - 3: waiting extra approval - 4: deleted - 5: archived",
              "enum": [
                0,
                1,
                2,
                3,
                4,
                5
              ]
            }
          },
          {
            "name": "campaign_list",
            "in": "body",
            "required": true,
            "schema": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer",
                    "description": "Fundraising team campaign id"
                  },
                  "default": {
                    "type": "boolean",
                    "description": "Fundraising team campaign is currently active & default"
                  }
                }
              }
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      },
      {
        "action": "update_team_campaign",
        "operationId": "updateFundraisingTeamCampaign",
        "method": "PUT",
        "path": "/fundraising-team/{team_id}/campaign/{campaign_id}",
        "summary": "Update Fundraising Team Campaign",
        "params": [
          {
            "name": "team_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "campaign_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "default",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "Fundraising team campaign is currently active & default"
            }
          },
          {
            "name": "title",
            "in": "body",
            "required": true,
            "schema": {
              "description": "Fundraising teams' campaign title",
              "type": "string"
            }
          },
          {
            "name": "has_target",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "true if campaign has target"
            }
          },
          {
            "name": "target",
            "in": "body",
            "required": false,
            "schema": {
              "type": "number",
              "description": "campaign target"
            }
          },
          {
            "name": "target_currency_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "number",
              "description": "campaign target currency id"
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      }
    ]
  },
  {
    "name": "fonzip_forms",
    "description": "Ozel formlar ve form cevaplari: form listesi, cevap listesi, cevap detayi ve bir cevaba yanit yazma.",
    "readOnly": false,
    "actions": [
      {
        "action": "get_answer",
        "operationId": "getFormAnswerDetails",
        "method": "GET",
        "path": "/form/{form_id}/answer/{answer_id}",
        "summary": "Get Form Answer Details",
        "params": [
          {
            "name": "form_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "answer_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list",
        "operationId": "getFormList",
        "method": "GET",
        "path": "/forms",
        "summary": "List Forms",
        "params": [
          {
            "name": "query",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "search parameter. start with - (minus) char to exclude searched text"
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          },
          {
            "name": "archived",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "default": null,
              "enum": [
                null,
                true
              ],
              "description": "true for archived records, null for normal records"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list_answers",
        "operationId": "getFormAnswerList",
        "method": "GET",
        "path": "/form-answers",
        "summary": "List Form Answers",
        "params": [
          {
            "name": "query",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "search parameter. start with - (minus) char to exclude searched text"
            }
          },
          {
            "name": "start_date",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "Start date filtering for transaction__complete_date or complete_date fields. Must be before end_date."
            }
          },
          {
            "name": "end_date",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "End date filtering for transaction__complete_date or complete_date fields. Must be after start_date."
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          },
          {
            "name": "status",
            "in": "query",
            "required": false,
            "defaultValue": "answer",
            "schema": {
              "type": "string",
              "description": "answer status - answer: list answers - waiting_approval: list answers waiting approval - rejected: list rejected answers - refund: list refunds - failed: list failed answers",
              "default": "answer",
              "enum": [
                "answer",
                "waiting_approval",
                "rejected",
                "refund",
                "failed"
              ]
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "respond_to_answer",
        "operationId": "respondFormAnswer",
        "method": "POST",
        "path": "/form/{form_id}/answer/{answer_id}",
        "summary": "Respond to Form Answer.",
        "params": [
          {
            "name": "form_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "answer_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "response_type",
            "in": "body",
            "required": true,
            "schema": {
              "type": "string",
              "description": "response type",
              "enum": [
                "approve",
                "reject"
              ]
            }
          },
          {
            "name": "answer",
            "in": "body",
            "required": true,
            "schema": {
              "type": "object",
              "description": "approval/rejection details",
              "properties": {
                "send_mail": {
                  "type": "boolean"
                },
                "membership_no_decision": {
                  "type": "string",
                  "description": "how to assign the new membership number - no: does not make any changes - auto: assigns the next available membership number incrementally - custom: sets your value",
                  "enum": [
                    "no",
                    "auto",
                    "custom"
                  ]
                },
                "membership_no": {
                  "type": "integer",
                  "description": "custom membership number you'd like to set, valid when membership_no_decision is custom"
                },
                "send_from_template": {
                  "type": "boolean",
                  "description": "True if you want to send email from template"
                },
                "has_association_logo": {
                  "type": "boolean",
                  "description": "True if mail includes the logo of association"
                },
                "title": {
                  "type": "string",
                  "description": "Template Title"
                },
                "subject": {
                  "type": "string",
                  "description": "Subject"
                },
                "message": {
                  "type": "string",
                  "description": "Template content"
                },
                "update_template": {
                  "type": "boolean",
                  "description": "True if you want to overwrite message of template"
                },
                "save_as_template": {
                  "type": "boolean",
                  "description": "True if you want to save message as template"
                },
                "has_button": {
                  "type": "boolean",
                  "description": "whether a button is added or not"
                },
                "background_color": {
                  "type": "string",
                  "description": "background color in HEX format, such as"
                },
                "body_color": {
                  "type": "string",
                  "description": "text color in HEX format, such as"
                },
                "footer_text_color": {
                  "type": "string",
                  "description": "footer text color in HEX format, such as"
                },
                "footer_icon_color": {
                  "type": "integer"
                },
                "btn_text": {
                  "type": "string",
                  "description": "button text"
                },
                "btn_color": {
                  "type": "string",
                  "description": "button color in HEX format, such as"
                },
                "btn_text_color": {
                  "type": "string",
                  "description": "button text in HEX format, such as"
                },
                "btn_operation": {
                  "type": "integer",
                  "description": "button operation. 1 for URL, 2 for Fonzip Related operation",
                  "enum": [
                    1,
                    2
                  ]
                },
                "btn_operation_detail": {
                  "type": "string",
                  "description": "button action detail",
                  "enum": [
                    "Any URL for operation 1",
                    "login",
                    "cc",
                    "donation",
                    "dues",
                    "member_card"
                  ]
                },
                "template_id": {
                  "type": "integer",
                  "description": "Template ID to be sent"
                },
                "make_refund": {
                  "type": "boolean",
                  "description": "refund if there's a payment of form answer"
                }
              }
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      }
    ]
  },
  {
    "name": "fonzip_ecards",
    "description": "E-kartlar: kart ve kart kategorisi yonetimi, e-kart satis islemlerini listeleme, detay ve silme.",
    "readOnly": false,
    "actions": [
      {
        "action": "create_category",
        "operationId": "createEcardCategory",
        "method": "POST",
        "path": "/ecard-categories",
        "summary": "Create E-Card Category",
        "params": [
          {
            "name": "name",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Donation/E-Card Category name"
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      },
      {
        "action": "delete_category",
        "operationId": "deleteEcardCategory",
        "method": "DELETE",
        "path": "/ecard-categories/{category_id}",
        "summary": "Delete E-Card Category",
        "params": [
          {
            "name": "category_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "delete_transaction",
        "operationId": "deleteEcardTransaction",
        "method": "DELETE",
        "path": "/ecard-transactions/{sale_id}",
        "summary": "Delete E-Card Transaction",
        "params": [
          {
            "name": "sale_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "get",
        "operationId": "getEcardDetails",
        "method": "GET",
        "path": "/ecards/{ecard_id}",
        "summary": "Get E-Card Details",
        "params": [
          {
            "name": "ecard_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "get_transaction",
        "operationId": "getEcardTransactionDetails",
        "method": "GET",
        "path": "/ecard-transactions/{sale_id}",
        "summary": "Get E-Card Transaction Details",
        "params": [
          {
            "name": "sale_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list",
        "operationId": "getEcardList",
        "method": "GET",
        "path": "/ecards",
        "summary": "List E-Cards",
        "params": [
          {
            "name": "query",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "search parameter. start with - (minus) char to exclude searched text"
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          },
          {
            "name": "listing",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "E-Card available for sale in E-Card page - 0: private - 1: available - 2: available only via url",
              "enum": [
                0,
                1,
                2
              ]
            }
          },
          {
            "name": "category_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "filter based on ecard category id"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list_categories",
        "operationId": "getEcardCategoryList",
        "method": "GET",
        "path": "/ecard-categories",
        "summary": "List E-Card Categories",
        "params": [
          {
            "name": "query",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "search parameter. start with - (minus) char to exclude searched text"
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list_transactions",
        "operationId": "getEcardTransactionList",
        "method": "GET",
        "path": "/ecard-transactions",
        "summary": "List E-Card Transactions",
        "params": [
          {
            "name": "query",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "search parameter. start with - (minus) char to exclude searched text"
            }
          },
          {
            "name": "start_date",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "Start date filtering for transaction__complete_date or complete_date fields. Must be before end_date."
            }
          },
          {
            "name": "end_date",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "End date filtering for transaction__complete_date or complete_date fields. Must be after start_date."
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          },
          {
            "name": "payment_method",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "enum": [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10
              ],
              "description": "payment type code - null: All - 0: Card - 1: Cash - 2: Wire Transfer - 3: POS - 4: SMS - 6: Postal Check - 7: Paypal - 8: BKM Express - 9: iDEAL - 10: Pay With Iyzico"
            }
          },
          {
            "name": "amount",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "payment/debt amount"
            }
          },
          {
            "name": "amt_cnd",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "default": null,
              "enum": [
                null,
                "!=",
                "<",
                "<=",
                ">",
                ">="
              ],
              "description": "amount condition if amount filter is present - null: equals to amount - !=: not equals to amount - <: smaller than amount - <=: smaller and equal to amount - \\>: bigger than amount - \\>=: bigger and equal to amount"
            }
          },
          {
            "name": "bin_number",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "card BIN number"
            }
          },
          {
            "name": "last_four",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "card last four digits"
            }
          },
          {
            "name": "status",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "E-Card Transaction status. Defaults to `paid` when omitted. Any other value is rejected with HTTP 400. - paid: successful E-Card transactions - refund: refunded E-Card transactions - failed: failed E-Card transactions",
              "default": "paid",
              "enum": [
                "paid",
                "refund",
                "failed"
              ]
            }
          },
          {
            "name": "cargo_status",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "enum": [
                0,
                1,
                2,
                3,
                4
              ],
              "description": "*(paid only)* filter based on cargo status - null: all - 0: will not be sent - 1: waiting to be prepared - 2: waiting for cargo info - 3: posted - 4: waiting to be prepared **or** waiting for cargo info (1 and 2 combined)"
            }
          },
          {
            "name": "order_by",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "default": "-transaction__complete_date",
              "description": "Ordering. Any field of the `CertificateSale` model (or a `transaction__` / `certificate__` related field) is accepted; an unknown field is rejected with HTTP 400. Rows are always tie-broken by `id`. The default depends on `status`: `-transaction__refund_date` for `refund`, `-transaction__complete_date` for `paid` and…"
            }
          },
          {
            "name": "ecard_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "*(paid only)* filter sales on e-Card id"
            }
          },
          {
            "name": "payment_settings_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "*(paid only)* payment settings id"
            }
          },
          {
            "name": "bank_account_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "*(paid only)* bank account id"
            }
          },
          {
            "name": "currency_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "*(paid only)* filter transactions on currency id"
            }
          },
          {
            "name": "bill_type",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "enum": [
                0,
                1,
                2
              ],
              "description": "*(paid only)* filter on the requested billing information type - 0: no bill - 1: personal - 2: corporate"
            }
          },
          {
            "name": "delivery_date",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "*(paid only)* Return only transactions scheduled for future delivery (`delivery_time_mode` 1 or 2) whose delivery date - either on the transaction itself or on one of its recipients - equals this date. Sent as a date-time; it is converted to the association timezone and compared as a date."
            }
          },
          {
            "name": "card_country",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "enum": [
                1,
                2,
                3
              ],
              "description": "*(paid only)* filter card payments on the issuing bank's country, relative to the association's own country. Any other value is rejected with HTTP 400. - 1: local (issued in the association's country) - 2: abroad - 3: unknown (BIN not recognised)"
            }
          },
          {
            "name": "card_type",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "enum": [
                1,
                2,
                3,
                4
              ],
              "description": "*(paid only)* filter card payments on card type. Any other value is rejected with HTTP 400. - 1: credit - 2: debit - 3: prepaid - 4: unknown (BIN not recognised)"
            }
          },
          {
            "name": "utm_source",
            "in": "query",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "*(paid only)* Filter e-card transactions whose marketing channel `utm_source` matches one of the supplied values (IN-list). Repeat the parameter to supply multiple values, e.g. `?utm_source=google&utm_source=bing`."
            }
          },
          {
            "name": "utm_medium",
            "in": "query",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "*(paid only)* Filter e-card transactions by one or more `utm_medium` values (IN-list)."
            }
          },
          {
            "name": "utm_campaign",
            "in": "query",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "*(paid only)* Filter e-card transactions by one or more `utm_campaign` values (IN-list)."
            }
          },
          {
            "name": "utm_content",
            "in": "query",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "*(paid only)* Filter e-card transactions by one or more `utm_content` values (IN-list)."
            }
          },
          {
            "name": "marketing_channel_null",
            "in": "query",
            "required": false,
            "schema": {
              "type": "boolean",
              "default": null,
              "description": "*(paid only)* When true, return only e-card transactions with no marketing channel attached (organic / direct traffic). Mutually exclusive with the four UTM filters above — when set, those are ignored."
            }
          },
          {
            "name": "list",
            "in": "query",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string",
                "description": "field names. Gecerli degerler: ecard, amount, email_status, complete_date, payment_method, fonzip_id, transaction_id, provision_no, receipt_no, ip_address, payment_settings_id, payment_settings__name, bank_account_id, bank_account__name, added_by_id, card_number, delivery_date, news_via_phone, news_via_sms, news_via_email, recipient_list, bill_type, billing_name, tax_info, billing_address, billing_district, billing_city, address, city, district, referring, third_name, referring_name, referring_email, referring_phone, language, donor_type, delivery_to, delivery_to_name, custom_message, has_cargo, deliver_as_mail, deliver_as_cargo, ecard_date, category, marketing_channel__utm_source, marketing_channel__utm_medium, marketing_channel__utm_campaign, marketing_channel__utm_content"
              },
              "description": "*(paid only)* Selects the optional fields returned for each transaction. Repeat the parameter to request several fields, e.g. `?list=ecard&list=amount&list=category`. Every response always contains this base set, whatever `list` holds: `id`, `user_id`, `first_name`, `last_name`, `email`, `phone`, `certificate_id`, `ce…"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "update_category",
        "operationId": "updateEcardCategory",
        "method": "PUT",
        "path": "/ecard-categories/{category_id}",
        "summary": "Update E-Card Category",
        "params": [
          {
            "name": "category_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "name",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Donation/E-Card Category name"
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      }
    ]
  },
  {
    "name": "fonzip_tags",
    "description": "Etiketler: kurum genelindeki etiketleri listeleme, olusturma, guncelleme ve silme.",
    "readOnly": false,
    "actions": [
      {
        "action": "create",
        "operationId": "createTag",
        "method": "POST",
        "path": "/tags",
        "summary": "Create Tag",
        "params": [
          {
            "name": "name",
            "in": "body",
            "required": true,
            "schema": {
              "type": "string",
              "description": "Tag Name"
            }
          },
          {
            "name": "color",
            "in": "body",
            "required": true,
            "schema": {
              "description": "Tag color",
              "type": "string",
              "enum": [
                "tag-1",
                "tag-2",
                "tag-3",
                "tag-4",
                "tag-5",
                "tag-6",
                "tag-7",
                "tag-8"
              ]
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      },
      {
        "action": "delete",
        "operationId": "deleteTag",
        "method": "DELETE",
        "path": "/tags/{tag_id}",
        "summary": "Delete Tag",
        "params": [
          {
            "name": "tag_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list",
        "operationId": "getTagsList",
        "method": "GET",
        "path": "/tags",
        "summary": "List Tags",
        "params": [
          {
            "name": "query",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "search parameter. start with - (minus) char to exclude searched text"
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "update",
        "operationId": "updateTag",
        "method": "PUT",
        "path": "/tags/{tag_id}",
        "summary": "Update Tag",
        "params": [
          {
            "name": "tag_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "name",
            "in": "body",
            "required": true,
            "schema": {
              "type": "string",
              "description": "Tag Name"
            }
          },
          {
            "name": "color",
            "in": "body",
            "required": true,
            "schema": {
              "description": "Tag color",
              "type": "string",
              "enum": [
                "tag-1",
                "tag-2",
                "tag-3",
                "tag-4",
                "tag-5",
                "tag-6",
                "tag-7",
                "tag-8"
              ]
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      }
    ]
  },
  {
    "name": "fonzip_templates",
    "description": "E-posta/mesaj sablonlari: listeleme, detay, olusturma, guncelleme ve silme.",
    "readOnly": false,
    "actions": [
      {
        "action": "create",
        "operationId": "createTemplate",
        "method": "POST",
        "path": "/templates",
        "summary": "Create Template",
        "params": [
          {
            "name": "category_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "Template category id"
            }
          },
          {
            "name": "category__name",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Template category name"
            }
          },
          {
            "name": "title",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Template Title"
            }
          },
          {
            "name": "subject",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Subject"
            }
          },
          {
            "name": "message",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Template content"
            }
          },
          {
            "name": "has_association_logo",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "True if mail includes the logo of association"
            }
          },
          {
            "name": "type_sms",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "True if template is for sms, False if template is for email"
            }
          },
          {
            "name": "background_color",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "background color in HEX format, such as"
            }
          },
          {
            "name": "body_color",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "text color in HEX format, such as"
            }
          },
          {
            "name": "footer_text_color",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "footer text color in HEX format, such as"
            }
          },
          {
            "name": "footer_icon_color",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "footer icon color in HEX format, such as"
            }
          },
          {
            "name": "has_button",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "whether a button is added or not"
            }
          },
          {
            "name": "btn_text",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "button text"
            }
          },
          {
            "name": "btn_color",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "button color in HEX format, such as"
            }
          },
          {
            "name": "btn_text_color",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "button text in HEX format, such as"
            }
          },
          {
            "name": "btn_operation",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "button operation. 1 for URL, 2 for Fonzip Related operation",
              "enum": [
                1,
                2
              ]
            }
          },
          {
            "name": "btn_operation_detail",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "button action detail",
              "enum": [
                "Any URL for operation 1",
                "login",
                "cc",
                "donation",
                "dues",
                "member_card"
              ]
            }
          },
          {
            "name": "translations",
            "in": "body",
            "required": false,
            "schema": {
              "type": "object",
              "description": "translations of template",
              "properties": {
                "language_code": {
                  "type": "object",
                  "properties": {
                    "subject": {
                      "type": "string"
                    },
                    "message": {
                      "type": "string"
                    },
                    "btn_text": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": false
      },
      {
        "action": "delete",
        "operationId": "deleteTemplate",
        "method": "DELETE",
        "path": "/template/{template_id}",
        "summary": "Delete Template",
        "params": [
          {
            "name": "template_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "get",
        "operationId": "getTemplateDetails",
        "method": "GET",
        "path": "/template/{template_id}",
        "summary": "Get Template Details",
        "params": [
          {
            "name": "template_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list",
        "operationId": "listTemplates",
        "method": "GET",
        "path": "/templates",
        "summary": "List Templates",
        "params": [
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          },
          {
            "name": "query",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "search parameter. start with - (minus) char to exclude searched text"
            }
          },
          {
            "name": "template_type",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "template type filter",
              "enum": [
                "e",
                "s"
              ]
            }
          },
          {
            "name": "category_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "template category id"
            }
          },
          {
            "name": "order_by",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "order by",
              "enum": [
                "title",
                "-title",
                "create_date",
                "-create_date"
              ]
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "update",
        "operationId": "updateTemplate",
        "method": "PUT",
        "path": "/template/{template_id}",
        "summary": "Update Template",
        "params": [
          {
            "name": "template_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "category_id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "Template category id"
            }
          },
          {
            "name": "category__name",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Template category name"
            }
          },
          {
            "name": "title",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Template Title"
            }
          },
          {
            "name": "subject",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Subject"
            }
          },
          {
            "name": "message",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Template content"
            }
          },
          {
            "name": "has_association_logo",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "True if mail includes the logo of association"
            }
          },
          {
            "name": "type_sms",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "True if template is for sms, False if template is for email"
            }
          },
          {
            "name": "background_color",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "background color in HEX format, such as"
            }
          },
          {
            "name": "body_color",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "text color in HEX format, such as"
            }
          },
          {
            "name": "footer_text_color",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "footer text color in HEX format, such as"
            }
          },
          {
            "name": "footer_icon_color",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "footer icon color in HEX format, such as"
            }
          },
          {
            "name": "has_button",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "whether a button is added or not"
            }
          },
          {
            "name": "btn_text",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "button text"
            }
          },
          {
            "name": "btn_color",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "button color in HEX format, such as"
            }
          },
          {
            "name": "btn_text_color",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "button text in HEX format, such as"
            }
          },
          {
            "name": "btn_operation",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "button operation. 1 for URL, 2 for Fonzip Related operation",
              "enum": [
                1,
                2
              ]
            }
          },
          {
            "name": "btn_operation_detail",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "button action detail",
              "enum": [
                "Any URL for operation 1",
                "login",
                "cc",
                "donation",
                "dues",
                "member_card"
              ]
            }
          },
          {
            "name": "translations",
            "in": "body",
            "required": false,
            "schema": {
              "type": "object",
              "description": "translations of template",
              "properties": {
                "language_code": {
                  "type": "object",
                  "properties": {
                    "subject": {
                      "type": "string"
                    },
                    "message": {
                      "type": "string"
                    },
                    "btn_text": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": false
      }
    ]
  },
  {
    "name": "fonzip_webhooks",
    "description": "Webhook'lar: kayitli webhook'lari listeleme, detay, olusturma, guncelleme, test bildirimi gonderme ve silme.",
    "readOnly": false,
    "actions": [
      {
        "action": "create",
        "operationId": "createWebhook",
        "method": "POST",
        "path": "/webhooks",
        "summary": "Create Webhook",
        "params": [
          {
            "name": "id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "Webhook Id"
            }
          },
          {
            "name": "name",
            "in": "body",
            "required": true,
            "schema": {
              "type": "string",
              "description": "Webhook Name"
            }
          },
          {
            "name": "url",
            "in": "body",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uri",
              "description": "Webhook URL"
            }
          },
          {
            "name": "authentication",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "True if authentication header is set"
            }
          },
          {
            "name": "auth_token",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "basic authentication header value"
            }
          },
          {
            "name": "events",
            "in": "body",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "DONATION": {
                  "type": "boolean",
                  "description": "subscribe to donations"
                },
                "SUBSCRIPTION": {
                  "type": "boolean",
                  "description": "subscribe to membership dues"
                },
                "TICKET": {
                  "type": "boolean",
                  "description": "subscribe to ticket sales"
                },
                "FORM": {
                  "type": "boolean",
                  "description": "subscribe to form answers"
                },
                "CERTIFICATE_SALE": {
                  "type": "boolean",
                  "description": "subscribe to E-Card transactions"
                },
                "FUNDRAISING_CAMPAIGN": {
                  "type": "boolean",
                  "description": "subscribe to fundraising campaigns"
                }
              }
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": false
      },
      {
        "action": "delete",
        "operationId": "deleteWebhook",
        "method": "DELETE",
        "path": "/webhook/{webhook_id}",
        "summary": "Delete Webhook",
        "params": [
          {
            "name": "webhook_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "get",
        "operationId": "getWebhookDetails",
        "method": "GET",
        "path": "/webhook/{webhook_id}",
        "summary": "Get Webhook Details",
        "params": [
          {
            "name": "webhook_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list",
        "operationId": "listWebhooks",
        "method": "GET",
        "path": "/webhooks",
        "summary": "List Webhooks",
        "params": [],
        "bodyRequired": false
      },
      {
        "action": "send_test_notification",
        "operationId": "sendWebhookTestNotification",
        "method": "PATCH",
        "path": "/webhook/{webhook_id}",
        "summary": "Send Webhook Test Notification",
        "params": [
          {
            "name": "webhook_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "update",
        "operationId": "updateWebhook",
        "method": "PUT",
        "path": "/webhook/{webhook_id}",
        "summary": "Update Webhook",
        "params": [
          {
            "name": "webhook_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "id",
            "in": "body",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "Webhook Id"
            }
          },
          {
            "name": "name",
            "in": "body",
            "required": true,
            "schema": {
              "type": "string",
              "description": "Webhook Name"
            }
          },
          {
            "name": "url",
            "in": "body",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uri",
              "description": "Webhook URL"
            }
          },
          {
            "name": "authentication",
            "in": "body",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "True if authentication header is set"
            }
          },
          {
            "name": "auth_token",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "basic authentication header value"
            }
          },
          {
            "name": "events",
            "in": "body",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "DONATION": {
                  "type": "boolean",
                  "description": "subscribe to donations"
                },
                "SUBSCRIPTION": {
                  "type": "boolean",
                  "description": "subscribe to membership dues"
                },
                "TICKET": {
                  "type": "boolean",
                  "description": "subscribe to ticket sales"
                },
                "FORM": {
                  "type": "boolean",
                  "description": "subscribe to form answers"
                },
                "CERTIFICATE_SALE": {
                  "type": "boolean",
                  "description": "subscribe to E-Card transactions"
                },
                "FUNDRAISING_CAMPAIGN": {
                  "type": "boolean",
                  "description": "subscribe to fundraising campaigns"
                }
              }
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": false
      }
    ]
  },
  {
    "name": "fonzip_communication_permissions",
    "description": "Iletisim izinleri (e-posta/SMS/telefon): bir adres veya numaranin izin durumunu sorgulama, guncelleme ve degisenleri listeleme.",
    "readOnly": false,
    "actions": [
      {
        "action": "get",
        "operationId": "getCommunicationPermissions",
        "method": "GET",
        "path": "/communication-permissions/{permission_type}/{permission_value}",
        "summary": "Lists the communication permissions of permission value",
        "params": [
          {
            "name": "permission_type",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "description": "Permission Types <br> - email <br> - sms <br> - phone",
              "enum": [
                "email",
                "sms",
                "phone"
              ]
            }
          },
          {
            "name": "permission_value",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "description": "email or phone number in E164 format"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "list_changed",
        "operationId": "listChangedCommunicationPermissions",
        "method": "GET",
        "path": "/communication-permissions/{permission_type}",
        "summary": "Lists the communication permissions changed in the last X days",
        "params": [
          {
            "name": "permission_type",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "description": "Permission Types <br> - email <br> - sms <br> - phone",
              "enum": [
                "email",
                "sms",
                "phone"
              ]
            }
          },
          {
            "name": "days",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "Number of days before today.",
              "minimum": 1,
              "maximum": 7,
              "default": 3
            }
          },
          {
            "name": "start_page",
            "in": "query",
            "required": false,
            "defaultValue": 1,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1,
              "description": "start page of records"
            }
          },
          {
            "name": "how_many",
            "in": "query",
            "required": false,
            "defaultValue": 10,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10,
              "description": "How many records should be listed"
            }
          }
        ],
        "bodyRequired": false
      },
      {
        "action": "update",
        "operationId": "updateCommunicationPermissions",
        "method": "PUT",
        "path": "/communication-permissions/{permission_type}/{permission_value}",
        "summary": "Updates the communication permissions of permission value",
        "params": [
          {
            "name": "permission_type",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "description": "Permission Types <br> - email <br> - sms <br> - phone",
              "enum": [
                "email",
                "sms",
                "phone"
              ]
            }
          },
          {
            "name": "permission_value",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "description": "email or phone number in E164 format"
            }
          },
          {
            "name": "permission",
            "in": "body",
            "required": true,
            "schema": {
              "type": "boolean",
              "description": "communication permitted or not"
            }
          },
          {
            "name": "update_date",
            "in": "body",
            "required": true,
            "schema": {
              "type": "string",
              "format": "date-time",
              "description": "value last update date"
            }
          },
          {
            "name": "details",
            "in": "body",
            "required": false,
            "schema": {
              "type": "string",
              "description": "additional details like channel, IP address etc."
            }
          }
        ],
        "bodyContentType": "application/json",
        "bodyRequired": true
      }
    ]
  }
];
