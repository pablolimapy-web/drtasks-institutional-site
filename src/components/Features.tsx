import { Reveal } from "./Reveal";


function MiniVisual({ type }: { type: string }) {
  if (type === "flow") return <div className="mini-flow"><i/><b/><b/><em/></div>;
  if (type === "bars") return <div className="mini-bars"><span style={{width:'84%'}}/><span style={{width:'66%'}}/><span style={{width:'92%'}}/></div>;
  if (type === "chart") return <div className="mini-chart"><span/><span/><span/><span/></div>;
}

export function Features() {
  return (
      <div className="container surface features-surface">
        </div>
      </div>
    </section>
  );
}
