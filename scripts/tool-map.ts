/**
 * OpenAPI tag -> MCP tool eslesmesi.
 *
 * Fonzip API v2'de 115 operasyon ve 20 tag var. Her operasyon icin ayri bir MCP
 * tool uretmek istemci tarafinda tool listesini sisirdiginden, birbirine yakin
 * tag'ler tek bir tool altinda "action" parametresiyle gruplanir.
 */

export interface ToolSpec {
  /** MCP tool adi. */
  name: string;
  /** Bu tool'a dahil edilen OpenAPI tag'leri. */
  tags: string[];
  /** Tool aciklamasi (Turkce). */
  description: string;
  /**
   * Action adi uretilirken operationId'den atilacak kelimeler.
   * Ornek: "Donations" tag'i icin ["donation", "donations"] verilirse
   * getDonationList -> list olur.
   */
  strip?: string[];
}

/** operationId -> action adi. Algoritmanin isabetsiz kaldigi yerler icin. */
export const ACTION_OVERRIDES: Record<string, string> = {
  getMe: "me",
  getUserDefinedValuesList: "list_user_defined_values",
  getUserList: "list",
  getDonationReport: "report",
  getMicroDonationList: "list_micro",
  getMicroDonationDetails: "get_micro",
  getDonationFormList: "list_donation_forms",
  getDonationPageList: "list_donation_pages",
  getPaymentSystemsList: "list_payment_systems",
  getBankAccountList: "list_bank_accounts",
  getMarketingChannelList: "list_marketing_channels",
  getMarketingChannelFilterValues: "list_marketing_channel_filter_values",
  listChangedCommunicationPermissions: "list_changed",
  getCommunicationPermissions: "get",
  updateCommunicationPermissions: "update",
  sendWebhookTestNotification: "send_test_notification",
  respondFormAnswer: "respond_to_answer",
  getFormAnswerDetails: "get_answer",
  getFormAnswerList: "list_answers",
  generateLoginLinkForUser: "login_link",
  addTagToUser: "add_tag",
  removeTagFromUser: "remove_tag",
  getUsersTagsList: "list_tags",
  getUsersTimeline: "timeline",
  getUsersDonationList: "list_donations",
  getUsersMicroDonationList: "list_micro_donations",
  getUsersMonthlyDonationList: "list_monthly_donations",
  getUsersMembershipDueList: "list_membership_dues",
  getUserBoughtTicketList: "list_tickets",
  getUserAnswerList: "list_form_answers",
  getUserEcardTransactionList: "list_ecard_transactions",
  createMonthlyDonationUpdateRequest: "create_update_request",
  sendCardUpdateRequestForMonthlyDonation: "send_card_update_request",
  cancelMonthlyDonation: "cancel",
  respondMonthlyDonationAmountChangeRequest: "respond_amount_change_request",
  changeMonthlyDonationValues: "change_values",
  getMembershipDuesList: "list",
  getMembershipDueDetails: "get",
  deleteMembershipDue: "delete",
  getMembershipDueDebtsList: "list_debts",
  getDebtDetails: "get_debt",
  updateDebt: "update_debt",
  updateDebtStatus: "update_debt_status",
  deleteDebt: "delete_debt",
  createDebt: "create_debt",
  getEcardTransactionList: "list_transactions",
  getEcardTransactionDetails: "get_transaction",
  deleteEcardTransaction: "delete_transaction",
  getFundraisingEvents: "list_events",
  getFundraisingTeams: "list_teams",
  getFundraisingTeamDetail: "get_team",
  getFundraisingTeamsCampaigns: "list_team_campaigns",
  createFundraisingTeamCampaign: "create_team_campaign",
  updateFundraisingTeamCampaign: "update_team_campaign",
  deleteFundraisingTeamCampaign: "delete_team_campaign",
  createFundraisingTeam: "create_team",
  updateFundraisingTeam: "update_team",
  deleteFundraisingTeam: "delete_team",
  createFundraisingEvent: "create_event",
  updateFundraisingEvent: "update_event",
  deleteFundraisingEvent: "delete_event",
};

/** Tool'a hic dahil edilmeyen operasyonlar. Token akisi sunucunun kendi isi. */
export const EXCLUDED_OPERATIONS = new Set(["getAccessToken", "oauthAuthorizeGet"]);

export const TOOLS: ToolSpec[] = [
  {
    name: "fonzip_system",
    tags: ["Authentication", "System"],
    description:
      "Hesap ve sistem bilgileri: baglantiyi dogrulayan kurum bilgisi (me), odeme sistemleri, banka hesaplari ve pazarlama kanallari. Kurulumu dogrulamak veya diger tool'larda kullanilacak ID'leri bulmak icin buradan baslayin.",
    strip: [],
  },
  {
    name: "fonzip_users",
    tags: ["Users"],
    description:
      "Uyeler/bagiscilar (kisiler): listeleme ve arama, detay, olusturma, guncelleme, silme; kisinin zaman tuneli, etiketleri, bagislari, aidatlari, biletleri ve form cevaplari.",
    strip: ["user", "users"],
  },
  {
    name: "fonzip_donations",
    tags: ["Donations", "Micro Donations", "Donation Pages", "Donation Forms"],
    description:
      "Bagislar: listeleme (tarih araligi zorunlu), detay, olusturma, silme, rapor; bagis kategorileri; mikro bagislar; bagis sayfalari ve formlari.",
    strip: ["donation", "donations"],
  },
  {
    name: "fonzip_monthly_donations",
    tags: ["Monthly Donations"],
    description:
      "Duzenli (aylik) bagislar: tutar degisiklik talebi olusturma/yanitlama, kart guncelleme talebi gonderme, duzenli bagisi iptal etme.",
    strip: ["monthly", "donation", "donations"],
  },
  {
    name: "fonzip_membership_dues",
    tags: ["Membership Dues"],
    description:
      "Aidatlar ve borclar: aidat aboneliklerini listeleme/detay/silme, borc (debt) olusturma, guncelleme, durum degistirme ve silme.",
    strip: ["membership", "due", "dues"],
  },
  {
    name: "fonzip_events",
    tags: ["Events"],
    description:
      "Etkinlikler: etkinlik olusturma, guncelleme, durum degistirme, silme; bilet tanimlari; bilet satislari ve satis detaylari.",
    strip: ["event", "events"],
  },
  {
    name: "fonzip_fundraising",
    tags: ["Fundraising Campaigns", "Fundraising Events", "Fundraising Teams"],
    description:
      "Bagis toplama: kampanyalar (fundraising campaign), kampanya etkinlikleri (fundraising event) ve takimlar (fundraising team) ile takimlara bagli kampanyalar.",
    strip: ["fundraising", "campaign", "campaigns"],
  },
  {
    name: "fonzip_forms",
    tags: ["Forms"],
    description:
      "Ozel formlar ve form cevaplari: form listesi, cevap listesi, cevap detayi ve bir cevaba yanit yazma.",
    strip: ["form", "forms"],
  },
  {
    name: "fonzip_ecards",
    tags: ["E-Cards", "E-Card Transactions"],
    description:
      "E-kartlar: kart ve kart kategorisi yonetimi, e-kart satis islemlerini listeleme, detay ve silme.",
    strip: ["ecard", "ecards"],
  },
  {
    name: "fonzip_tags",
    tags: ["Tags"],
    description: "Etiketler: kurum genelindeki etiketleri listeleme, olusturma, guncelleme ve silme.",
    strip: ["tag", "tags"],
  },
  {
    name: "fonzip_templates",
    tags: ["Templates"],
    description: "E-posta/mesaj sablonlari: listeleme, detay, olusturma, guncelleme ve silme.",
    strip: ["template", "templates"],
  },
  {
    name: "fonzip_webhooks",
    tags: ["Webhooks"],
    description:
      "Webhook'lar: kayitli webhook'lari listeleme, detay, olusturma, guncelleme, test bildirimi gonderme ve silme.",
    strip: ["webhook", "webhooks"],
  },
  {
    name: "fonzip_communication_permissions",
    tags: ["Communication Permissions"],
    description:
      "Iletisim izinleri (e-posta/SMS/telefon): bir adres veya numaranin izin durumunu sorgulama, guncelleme ve degisenleri listeleme.",
    strip: ["communication", "permission", "permissions"],
  },
];
