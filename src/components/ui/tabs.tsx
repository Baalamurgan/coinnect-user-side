import { sentencize } from "@/lib/utils";
import * as RadixTabs from "@radix-ui/react-tabs";
import * as React from "react";
import "./styles.css";

const Tabs = ({
  render,
  tabs,
}: {
  tabs: string[];
  render: Record<string, React.JSX.Element>;
}) => (
  <RadixTabs.Root className="TabsRoot" defaultValue={tabs[0]}>
    <RadixTabs.List className="TabsList" aria-label="Manage your account">
      {tabs.map((tab) => (
        <RadixTabs.Trigger className="TabsTrigger" value={tab} key={tab}>
          {sentencize(tab)}
        </RadixTabs.Trigger>
      ))}
    </RadixTabs.List>
    {tabs.map((tab) => (
      <RadixTabs.Content key={tab} className="TabsContent" value={tab}>
        {render[tab]}
      </RadixTabs.Content>
    ))}
  </RadixTabs.Root>
);

export default Tabs;
