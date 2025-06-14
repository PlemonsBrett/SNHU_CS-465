export interface Trip {
  _id?: string;       // MongoDB ObjectId, optional for new trips
  code: string;       // Trip code identifier
  name: string;       // Trip name
  length: string;     // Duration (e.g., "4 days / 3 nights")
  start: Date;        // Start date
  resort: string;     // Resort name
  perPerson: string;  // Cost per person
  image: string;      // Image file name
  description: string;// Trip description
}