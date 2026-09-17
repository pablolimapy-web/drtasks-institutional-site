"use client";

import { ArrowRightIcon } from "./Icons";


export function FluxOS() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  }, []);

  useEffect(() => {


  return (
      <div className="container surface flux-surface">
        <div className="flux-header">
        </div>

          </div>

              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
