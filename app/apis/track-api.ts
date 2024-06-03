import { z } from 'zod';

const trackSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string(),
  coverUrl: z.string(),
  type: z.union([z.literal('song'), z.literal('podcast'), z.literal('audiobook')]),
});

const trackDetailSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string(),
  coverUrl: z.string(),
  src: z.string().url(),
});

const tracksSchema = z.array(trackSchema);

export async function fetchTracks() {
  const response = await fetch('https://kwm24-api.vercel.app/api/tracks');
  const tracks = await response.json();

  const parsedTracks = tracksSchema.parse(tracks);
  // oder
  //   const parsedTracks = z.array(trackSchema).parse(tracks);

  return parsedTracks;
}

export async function fetchTrackById(trackId: string) {
  const response = await fetch(`https://kwm24-api.vercel.app/api/tracks/${trackId}`);
  const track = await response.json();

  console.log(track);
  const parsedTrack = trackDetailSchema.parse(track);

  return parsedTrack;
}
