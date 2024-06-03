import { Link } from "@remix-run/react";
import { Playlist } from "~/models/playlist";


export type PlayListCardProps = {
    playlist: Playlist;
}

export function PlaylistCard(props: PlayListCardProps) {
    const playlist = props.playlist
    
    return (
      <section className="card">
        <div className="card_cover aspect-square">
          <img alt={'Cover image of ' + playlist.title} src={playlist.imageUrl} className="card_cover-img" />
        </div>
  
        <div className="card_body">
          <div className="flex-auto">
            <h3 className="card_title">{playlist.title}</h3>
            <div>{playlist.tracks.length} tracks</div>
            <div><Link to={`/app/playlists/${playlist.id}`}>View full playlist</Link></div>
          </div>
        </div>
      </section>
    );
  }
  