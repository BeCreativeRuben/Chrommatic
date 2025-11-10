/**
 * Show card component
 * @param {Object} props
 * @param {Object} props.show - Show data object
 * @param {string} props.country - Country name
 */

import { formatDate } from "../../utils/dateFormatter";

function ShowCard({ show, country = "België" }) {
  return (
    <div className="flex justify-between items-center py-4" role="article">
      <time className="text-gray-400 w-1/4 text-left" dateTime={show.date}>
        {formatDate(show.date)}
      </time>
      <div className="flex-1 text-center">
        <p className="font-semibold">{show.title}</p>
      </div>
      <address className="text-gray-400 text-sm w-1/4 text-right not-italic">
        {show.location}, {country}
      </address>
    </div>
  );
}

export default ShowCard;

