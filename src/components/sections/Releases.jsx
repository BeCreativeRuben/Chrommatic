/**
 * Releases section component
 */

import { releases } from "../../data/releases";
import ReleaseCard from "../ui/ReleaseCard";

function Releases() {
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold mb-10 text-center">Releases</h2>

      <div className="grid md:grid-cols-2 gap-12">
        {releases.map((release) => (
          <ReleaseCard key={release.id} release={release} />
        ))}
      </div>
    </div>
  );
}

export default Releases;

