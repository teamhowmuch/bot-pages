export interface ChatData {
  email: string;
  bot_version: string;
  id: string;

  companies: {
    travel_insurance: string;
    health_insurance: string;
    banks: string[];
  };
}
