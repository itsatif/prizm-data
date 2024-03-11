import { Injectable } from '@angular/core';

export interface Service {
  slug: string;
  title: string;
  description: string;
  subheading: string;
  subDescription?: string;
  listItems: string[];
  imgSrc: string;
}

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  serviceDetails: Service[] = [
    {
      slug: 'quantitative-research',
      title: 'Quantitative Research',
      description:
        'Our Research has established itself as India’s fastest growing market research firm, with an impressive array of custom research clients who provide us with steady repeat business. The agency’s rapid growth has been fuelled by the following:',
      subheading: 'We offer a complete range of customised research solutions',
      listItems: [
        'Advertising Pre-Testing',
        'Ads Effectiveness Measurement Post Launch Both One-Off and Tracking',
        'Product Testing',
        'Concept Testing',
        'New Product Research, Including Volume Estimation',
        'Customer Satisfaction Measurement',
        'Trade Satisfaction Measurement',
        'Employee Satisfaction Measurement',
        'Brand Health Measurement and Tracking',
        'Package Testing',
      ],
      imgSrc: 'path/to/your/image.jpg',
    },
    {
      slug: 'qualitative-research',
      title: 'Qualitative Research',
      description:
        'PROLOG INSIGHTS ZILLION MARKET PRIVATE LIMITED, we design, develop, implement and monitor qualitative market research sessions, with an aim to turn consumer intelligence (information) into actionable, managed knowledge. We also design, develop, and implement methods that employ eclectic tools and techniques (e.g., Ethnographic Observation from Social Sciences).',
      subheading:
        'Our industry experience stretches across many service and\n' +
        'product areas. Our Qualitative Research uses the following\n' +
        'to explore those area',
      subDescription:
        'We are a market research company that selects and applies the right research, decision-making, or idea generation tools at the right time. We use our expert research and analysis skills to support your critical thinking and decision-making process, not replace it.\n' +
        '\n' +
        'We know these tools and techniques well and we know when and where to apply them to meet your needs. Our biggest strengths are decision-making clarification, focus, and knowing what to include and what to leave out of your marketing information system. We offer a system that helps you move forward and approach your market confidently and successfully',
      listItems: [
        'Consumer Psychographic Profiling',
        'Advertising research',
        'Product research',
        'Concept Testing',
        'Positioning',
        'Brand equity research',
        'Branding research',
        'Ethnography and Observations',
        'Design and product development',
        'Semiotic decoding and deconstruction',
      ],
      imgSrc: 'path/to/your/image.jpg',
    },
    {
      slug: 'b2b-research',
      title: 'B2B Research',
      description:
        'We help them to figure out metrics such as the cost per acquisition of a client, and it gives a clearer understanding of what the market wants in a product or service. \n' +
        '\n' +
        'B2B Market Research helps companies to gain valuable information about: Economic shifts. Competitors',
      subheading: 'Understanding Markets & Opportunities',
      listItems: [
        'Market Entry',
        'Market Sizing',
        'Competitor Mapping',
        'Distribution Scoping',
        'Understanding Customers, Buyers and Influencers',
        'Segmentation',
        'Customer Profiling',
        'Brand Health',
        'Corporate Image',
        'Communication Effectiveness',
        'Concept Tests',
        'New Product Development',
        'Attributes Prioritisation & Traits Research',
        'Pricing',
        'Customer Journey Map',
        'Voice Of The Customer',
        'Customer Satisfaction',
        'Stakeholders Satisfaction',
        'Net Promoter Score (NPS)',
      ],
      imgSrc: 'path/to/your/image.jpg',
    },
    {
      slug: 'india-data-facts',
      title: 'India Data Facts',
      description:
        'Not all clients want full service studies. A lot of clients look at just fieldwork and tabulated\n' +
        '\n' +
        'data. India Data Facts (IDF) is the answer to such requests.\n' +
        '\n' +
        'India Data Facts (IDF) is a data collection arm of Hansa Research. It is a focused vertical of\n' +
        '\n' +
        'Hansa Research for all your ‘data collection only’ requirements',
      subheading:
        'It is managed by professionals with over 20 years of\n' +
        'experience in the market research industry and can be used\n' +
        'for the following services:',
      listItems: [
        'Census operations',
        'Opinion/exit polls',
        'Consumer contact programs',
        'Any other data collection requirement through a variety of methods viz., CAPI, CATI, Online panel, Mobile panel and many more',
        'Most importantly it allows a part of the interview to be voice recorded',
      ],
      imgSrc: 'path/to/your/image.jpg',
    },
    {
      slug: 'industries',
      title: 'Industries',
      description: '',
      subheading: '',
      listItems: [
        'Automotive',
        'Technology',
        'Pharmaceuticals',
        'Telecommunications',
        'Consumer Packed Goods',
        'Finance and Banking',
        'Media and Ad Agencies',
        'Market Research Agencies',
        'Consulting',
        'Healthcare',
        'Politics',
        'Education',
        'Food and Beverages',
        'Retail',
        'Travel and Leisure',
      ],
      imgSrc: 'path/to/your/image.jpg',
    },
    {
      slug: 'solutions',
      title: 'Solutions',
      description: '',
      subheading: '',
      listItems: [
        'Validating ideas',
        'Market understanding',
        'New product building',
        'Customer happiness',
        'Campaign and Creative Testing',
        'Ad testing',
        'Customer journey to purchase',
        'After launch optimization',
        'Brand testing & measurement',
      ],
      imgSrc: 'path/to/your/image.jpg',
    },
  ];

  constructor() {}
}
