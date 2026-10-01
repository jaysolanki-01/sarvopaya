export type PovSection = {
  heading: string;
  body: string;
};

export type FounderPov = {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  readTime: string;
  author: string;
  sections: PovSection[];
};

export const founderPovs: FounderPov[] = [
  {
    slug: "d2c-paid-advertising-mistakes",
    title: "Why 80% of D2C brands fail at paid advertising, and what the successful ones do differently",
    date: "August 2026",
    tag: "Performance Marketing",
    readTime: "6 min read",
    author: "Jay Solanki",
    excerpt:
      "Most D2C brands treat Meta Ads as a tap. Turn it on, money comes out. Turn it off, nothing. Here's why that mental model destroys margins and what building a real acquisition system actually looks like.",
    sections: [
      {
        heading: "The tap mental model is killing your brand",
        body: "Walk into any D2C founder community and you'll hear the same story. \"We spent ₹3L on Meta last month and barely broke even.\" Then the same founder doubles down the next month hoping the algorithm will figure it out. It won't.\n\nThe fundamental mistake is treating paid advertising like a tap. A tap gives you water the moment you turn it on and stops the moment you turn it off. Brands built on tap-thinking have no asset, they have a dependency. The moment CPMs rise (and they always do), the moment iOS privacy updates hit (and they always will), the tap stops producing and the business has nothing to fall back on.",
      },
      {
        heading: "What the 20% are doing differently",
        body: "The D2C brands that actually scale through paid channels share one thing: they treat advertising as a system, not a transaction.\n\nA system has inputs, feedback loops, and compound assets. The inputs are spend and creative. The feedback loop is data, not just ROAS, but contribution margin, LTV, repeat rate, and creative fatigue signals. The compound assets are the creative learnings, the audience intelligence, and the email/SMS list built from every campaign.\n\nBrands with this mindset run the same ₹3L differently. They test 8–12 creative variations simultaneously. They track CAC against 90-day LTV, not 7-day return. They build their Meta learnings into their email sequences so a customer acquired through a video ad gets follow-ups that reference what they saw. The platform spend funds the system. The system produces the compounding return.",
      },
      {
        heading: "The creative is the targeting",
        body: "Here's the thing Meta's algorithm learned before most brands did: creative is targeting. A video that speaks directly to a 28-year-old urban woman who works long hours and prioritises quality over price will find that person, without any interest targeting layered on top.\n\nBrands that understand this produce creative at volume and let performance data tell them who is responding. They brief by outcome, not by format. They measure creative on thumb-stop rate, hook retention, and landing-page CVR, not just post-click ROAS.\n\nBrands that don't understand this spend six weeks arguing about the shade of their brand colour in the ad and wonder why their creative fatigue cycle is two weeks instead of six.",
      },
      {
        heading: "The metric that actually matters",
        body: "Most brands optimise for ROAS. ROAS is a platform metric. It tells you what Meta thinks of your ads, not what your business looks like.\n\nThe metric that matters is contribution margin, revenue minus product cost, ad spend, shipping, returns, and payment fees. A 4x ROAS on a product with 60% returns and high shipping cost produces a negative contribution margin. A 2.2x ROAS on a high-margin product with strong retention is a growth engine.\n\nThe brands that figure this out early stop chasing platform vanity metrics and start running their advertising like a finance team would, with a clear understanding of what each rupee spent actually produces for the business.",
      },
      {
        heading: "What to do with this",
        body: "If you're spending on Meta and not growing, audit your contribution margin first. Then look at your creative process, how many variations are you testing, how fast are you producing new angles, and how are you feeding creative learnings back into the brief?\n\nIf you want to talk through what a system looks like for your specific category, that's what we do. Not tap management, system building.",
      },
    ],
  },
  {
    slug: "ai-automation-removing-wasted-work",
    title: "AI automation isn't about replacing people, it's about removing the work that was already wasting them",
    date: "July 2026",
    tag: "AI Automation",
    readTime: "5 min read",
    author: "Jay Solanki",
    excerpt:
      "Every founder I talk to thinks AI automation will reduce headcount. The ones who actually deploy it find the opposite, their team finally has time to do the work that moves the needle.",
    sections: [
      {
        heading: "The headcount conversation is the wrong conversation",
        body: "When I talk to founders about AI automation, the question that comes up within the first five minutes is always some version of: \"So how many people can we replace?\"\n\nIt's the wrong question. Not because AI can't do the work, it demonstrably can in many cases, but because the founders asking it are solving the wrong problem. Their problem isn't headcount. Their problem is that their team spends 60% of its time doing work that doesn't need a human, and the 40% that does need a human is the part that's actually starved of attention.",
      },
      {
        heading: "What wasted work actually looks like",
        body: "In most businesses we work with, wasted work looks like this: a salesperson spending 45 minutes after every call updating the CRM, writing follow-up emails from scratch, and manually logging activity data that should have been captured automatically. A marketing team pulling weekly reports from five platforms, formatting them in Excel, and emailing a summary that took three hours to produce and will be skimmed in two minutes. An ops team fielding the same 12 customer service questions over and over, writing slightly different versions of the same answer each time.\n\nThis is not what you hired those people for. This is not why they took the job. And critically, this is the work that AI can absorb almost completely.",
      },
      {
        heading: "What actually happens when you deploy automation",
        body: "Every client we've automated processes for reports the same thing in the first 30 days: the team is initially skeptical, then relieved, then suddenly creative in ways they weren't before.\n\nWhen the FlowDesk team stopped manually triaging 70% of their support tickets, the three people who had been doing that work didn't leave. They started building proactive customer success workflows that the team had talked about for two years but never had time to build. One of them is now leading the company's renewal strategy.\n\nWhen UrbanCart's merchandising team stopped manually updating product grids and promotional banners, they started running experiments they'd been too resource-constrained to attempt. Within six weeks, they had data on 14 new merchandising hypotheses. Before automation, they'd test maybe one a month.",
      },
      {
        heading: "The implementation mistake most founders make",
        body: "The mistake is automating for the sake of it, buying a stack of AI tools without a clear map of where manual work is actually happening and what the cost of that work is.\n\nBefore we build anything for a client, we do a process audit. Two hours, sometimes three, mapping every repeated task the team does in a week, what it involves, how long it takes, how often it happens, and what breaks if it doesn't happen correctly. The output is a prioritised list of automations ranked by effort-to-impact ratio.\n\nThe highest-impact automations are rarely the most technically impressive ones. They're usually the most boring ones. Automatic CRM updates. Lead enrichment on form submission. Weekly reporting compiled and formatted without anyone touching it.",
      },
      {
        heading: "The question you should be asking",
        body: "Not \"how many people can I replace\", but \"what is my team being stopped from doing by work that doesn't need them?\"\n\nAnswer that honestly, and the automation strategy writes itself. If you want help mapping it, that's a conversation worth having.",
      },
    ],
  },
  {
    slug: "indian-agencies-unfair-advantage",
    title: "Why Indian agencies should stop apologising for being Indian",
    date: "May 2026",
    tag: "Founder Opinion",
    readTime: "5 min read",
    author: "Jay Solanki",
    excerpt:
      "The conversation in our industry defaults to 'we can match Western quality at Indian prices.' That framing is wrong. Here's why Indian market knowledge is an unfair advantage, not a liability.",
    sections: [
      {
        heading: "The apology is embedded in the pitch",
        body: "Listen to how most Indian agencies pitch international clients and you'll hear the apology before the proposal starts. \"We offer Western-quality work at a fraction of the price.\" \"Our team is trained to the same standards as UK/US agencies.\" \"You won't notice a difference in the quality of delivery.\"\n\nEvery one of those statements positions India as the discounted version of somewhere else. They're well-intentioned, the fear is that a prospective client in London or Dubai will dismiss an Indian agency before the conversation starts, so the agency pre-empts the objection by framing itself as an equivalent, just cheaper.\n\nBut the framing has a fatal flaw: it makes price the only differentiator. And you cannot build a durable agency on being the cheapest.",
      },
      {
        heading: "The actual unfair advantage",
        body: "India has built more D2C brands from zero to meaningful scale in the last five years than almost any other market on earth. The constraints, razor-thin margins, fragmented logistics, a customer base that is simultaneously value-conscious and brand-aspirational, and a digital advertising ecosystem that rewards efficiency above everything else, have produced some of the most rigorous performance marketers anywhere.\n\nAn Indian performance marketing team that has scaled a skincare brand on Meta while managing a 30% return rate and logistics costs that would collapse a Western unit economics model has skills that a London agency that has only ever worked with clients who could afford comfortable margins simply doesn't have.\n\nThat's not parity. That's an advantage.",
      },
      {
        heading: "The markets that benefit most",
        body: "This matters most for clients who are either scaling in India, entering South and Southeast Asian markets, or are D2C brands globally who are competing on efficiency rather than brand luxury.\n\nFor these clients, an agency with deep Indian market experience isn't a discounted substitute for a Western agency, it's a more relevant choice. The playbooks are different. The creative instincts are different. The understanding of what a cost-constrained consumer responds to is different.\n\nWhen we work with a UK D2C brand trying to acquire cost-effectively on Meta, we're bringing a perspective that was forged in one of the most competitive paid advertising environments in the world. That perspective has value beyond the rate card.",
      },
      {
        heading: "What this means for how we pitch",
        body: "We stopped apologising. We stopped positioning ourselves as the affordable alternative. We started being specific about what we know that others don't, because that's where the actual conversation becomes interesting.\n\nThe clients who respond to that framing are the ones we want to work with. The clients who only want to talk about price were never going to be good partnerships anyway, regardless of where we're based.\n\nIf you're an Indian agency reading this: the discount pitch is a ceiling. The expertise pitch is a different conversation entirely. It starts with being willing to make the claim.",
      },
    ],
  },
  {
    slug: "bootstrapping-vs-venture-scale-marketing",
    title: "Why burning venture capital on ad platforms creates vanity brands, not durable businesses",
    date: "April 2026",
    tag: "Founder Opinion",
    readTime: "6 min read",
    author: "Jay Solanki",
    excerpt:
      "Venture-funded brands often confuse GMV with enterprise value. When the check clears, customer acquisition cost explodes because discipline disappears. Here is why profitable growth beats blitzscaling every single time.",
    sections: [
      {
        heading: "The addiction to subsidized acquisition",
        body: "Over the past six years, we watched tens of millions of dollars flow into consumer startups only to be handed directly over to Meta and Google. Founders boasted about 300% top-line year-on-year growth, yet behind closed doors their blended CAC was double their first-order contribution margin.\n\nThe moment seed or Series A runway contracted, customer acquisition fell off a cliff. The brand did not own a customer base; they were renting eyeballs at subsidized prices.",
      },
      {
        heading: "The discipline of cashflow-first growth",
        body: "Bootstrapped and profitable brands operate with an entirely different psychological standard. Every rupee spent on paid search or paid social must fight for survival on Day 0.\n\nThis constraint forces three immediate virtues: obsessive creative iteration, rigorous post-purchase retention sequences, and brutal product-market validation. When you cannot afford negative unit economics, you learn how to turn first-time purchasers into repeat brand evangelists.",
      },
      {
        heading: "The Sarvopaya perspective",
        body: "At Sarvopaya, we do not partner with brands looking to burn cash to satisfy quarterly investor vanity metrics. We build sustainable acquisition architectures: high-converting funnels, automated retention workflows, and organic search moats that compound long after the ad budget pauses.\n\nIf your goal is to build an enduring enterprise with genuine cashflow margins, welcome to the other side of marketing.",
      },
    ],
  },
];

export function getFounderPovBySlug(slug: string): FounderPov | undefined {
  return founderPovs.find((post) => post.slug === slug);
}
