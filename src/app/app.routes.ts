import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ClientWeServeComponent} from "./client-we-serve/client-we-serve.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {CareerComponent} from "./career/career.component";
import {DownloadComponent} from "./download/download.component";
import {JoinUsComponent} from "./join-us/join-us.component";
import {SurveyParticipantsComponent} from "./survey-participants/survey-participants.component";
import {UpcomingEventsComponent} from "./upcoming-events/upcoming-events.component";
import {ServicesComponent} from "./services/services.component";
import {BlogsComponent} from "./blogs/blogs.component";
import {BlogDetailsComponent} from "./blog-details/blog-details.component";
import {ServiceDetailsComponent} from "./service-details/service-details.component";
import {ContactUsComponent} from "./contact-us/contact-us.component";

export const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'client-we-serve',component:ClientWeServeComponent},
  {path:'about-us',component:AboutUsComponent},
  {path:'career',component:CareerComponent},
  {path:'downloads',component:DownloadComponent},
  {path:'join-us',component:JoinUsComponent},
  {path:'survey-participants',component:SurveyParticipantsComponent},
  {path:'upcoming-events',component:UpcomingEventsComponent},
  {path:'contact-us',component:ContactUsComponent},
  {path:'services',component:ServicesComponent},
  {path:'services/:slug',component:ServiceDetailsComponent},
  {path:'blogs',component:BlogsComponent},
  {path:'blogs/:slug',component:BlogDetailsComponent}
];
