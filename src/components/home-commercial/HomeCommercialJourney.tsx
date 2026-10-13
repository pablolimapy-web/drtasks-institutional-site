import { FluxosStory } from "./stories/FluxosStory";
import { ProjectsStory } from "./stories/ProjectsStory";
import { FinanceStory } from "./stories/FinanceStory";
import { QuotesStory } from "./stories/QuotesStory";
import { RequestsStory } from "./stories/RequestsStory";
import { ChatStory } from "./stories/ChatStory";
import { TeamTimeStory } from "./stories/TeamTimeStory";
import { ResourcesStory } from "./stories/ResourcesStory";

export function HomeCommercialJourney() {
  return (
    <div data-home-visual-language="commercial-dark-v1">
      <FluxosStory />
      <ProjectsStory />
      <FinanceStory />
      <QuotesStory />
      <RequestsStory />
      <ChatStory />
      <TeamTimeStory />
      <ResourcesStory />
    </div>
  );
}
