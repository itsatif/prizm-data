import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

export interface Blogs {
  id: number;
  title: string;
  slug: string;
  date: string;
  content: any;
  conclusion: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  private readonly blogsData: Blogs[] = [
    {
      id: 1,
      imageUrl: 'assets/images/blog-1.jpg',
      "title": "The Power of B2B Research in Strengthening Business",
      "slug": "the-power-of-b2b-research-in-strengthening-business",
      "date": "2024-02-29",
      "content": [
        {
          "heading": "What is B2B Research?",
          "text": "B2B research is like a treasure hunt. Here, businesses search for valuable insights to enhance their operations. It involves understanding the needs and preferences. Also, you need to realize the challenges of other businesses. This creates a roadmap for collaboration. The research is not about big words and complex theories. Rather, it's about finding simple solutions to grave problems."
        },
        {
          "heading": "Connectivity Is The Most Important Aspect",
          "text": "B2B research binds businesses together. It figures out the unique needs of each company. Businesses can create connections that strengthen the overall structure. What are these?\n\nShort surveys\nQuick interviews\nFocused observations\n\nThese are tools that businesses use to connect with each other. It's about knowing what others need and offering just that.",
          "tip": "Research Tip: Keep it simple – ask questions like, \"What do you need to thrive?\" and \"How can we help you succeed?\""
        },
        {
          "heading": "Preventing Bottlenecks",
          "text": "In the business world, barriers are like roadblocks preventing progress. What are these barriers? These can be anything like communication gaps, misunderstanding each other's goals or some lack of information. B2B research knocks off these barriers. It established a clear communication and understanding. Interrogation can pave the way for effective communication.",
          "tip": "Research Tip: Break it down – ask questions like, \"What challenges do you face?\" and \"How can we make our collaboration smoother?\""
        },
        {
          "heading": "Listening Out",
          "text": "B2B research is not just about asking questions. It's about truly listening to the responses. Like a good friend always lends an ear. Similarly, businesses need to understand the concerns and aspirations of their partners. Surveys and interviews can help. Convey a sense of sincerity and openness.",
          "tip": "Research Tip: Listen actively – ask questions like, \"What are your goals?\" and \"How can we align our objectives for mutual success?\""
        },
        {
          "heading": "Bespoke Solutions",
          "text": "In the business world, not all are the same. B2B research enables companies to tailor their products or services. This is to meet the unique needs of their partners. Information gathered from research helps in customizing solutions. It finely integrates with the requirements of other businesses.",
          "tip": "Research Tip: Customize your approach – ask questions like, \"What features are essential for you?\" and \"How can we tailor our offerings to suit your needs?\""
        },
        {
          "heading": "Staying Agile",
          "text": "In a corporate circle, what works today might not work tomorrow. Things get obsolete faster. B2B research is a continuous process. It helps businesses stay agile. Companies can adapt to the changing needs. Short, regular check-ins through surveys or feedback sessions are important. It ensures that companies are always in sync with their partners' current challenges and expectations.",
          "tip": "Research Tip: Stay connected – ask questions like, \"How can we improve our collaboration?\" and \"What changes would benefit both of us?\""
        },
        {
          "heading": "Fostering Trust",
          "text": "Trust is the core of successful B2B relationships. Through research, businesses can gain deep insights. It can demonstrate their commitment to understanding and supporting their partners. Meaningful interactions build a foundation of trust. It becomes the essence of a lasting collaboration.",
          "tip": "Research Tip: Be genuine – ask questions like, \"How can we earn your trust?\" and \"What can we do to strengthen our partnership?\""
        },
        {
          "heading": "Celebrating Success Together",
          "text": "B2B research isn't just about identifying problems. It's also about recognizing and celebrating successes. Conduct short surveys and feedback loops. It allows businesses to acknowledge achievements and milestones in their collaborations. This positive reinforcement creates a culture of mutual appreciation. It further motivates both parties to strive for more significant accomplishments.",
          "tip": "Research Tip: Share victories – ask questions like, \"What achievements are you proud of?\" and \"How can we celebrate our joint successes?\""
        }
      ],
      "conclusion": "B2B research success is established through understanding and communication. It is important to collaborate and stay on the same page. Success becomes achievable when businesses immerse in the power of meaningful interactions. So, let's keep it simple, ask the right questions, and together build a strong foundation for B2B partnership"
    }
  ];
  public blogs$: BehaviorSubject<Blogs[]> = new BehaviorSubject<Blogs[]>(this.blogsData);

  constructor() {
  }
}
