import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import type { Episode } from './entities/episode.entity';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [
    {
      version: 1,
      id: 'ep-01',
      title: 'Sample episode',
      mediaFile: 'sample.mp4',
      requiredRegions: [
        { id: 'r1', start: 3, end: 7, label: 'Intro point' },
        { id: 'r2', start: 12, end: 17, label: 'Key takeaway' },
      ],
    },
  ];

  private indexOrThrow(id: string): number {
    const episodeIndex = this.episodes.findIndex(
      (episode) => episode.id === id,
    );
    if (episodeIndex === -1) {
      // 1. not found → throw a 404
      throw new NotFoundException(`Episode ${id} not found`);
    }
    return episodeIndex;
  }

  create(createEpisodeDto: CreateEpisodeDto) {
    // 1. build a new Episode: server sets id, version, requiredRegions; DTO gives title, mediaFile
    const episode: Episode = {
      id: crypto.randomUUID(),
      version: 1,
      title: createEpisodeDto.title,
      mediaFile: createEpisodeDto.mediaFile,
      requiredRegions: [],
    };
    // 2. add it to this.episodes
    this.episodes.push(episode);
    // 3. return it
    return episode;
  }

  findAll() {
    return this.episodes;
  }

  findOne(id: string) {
    const episodeIndex = this.indexOrThrow(id);
    return this.episodes[episodeIndex];
  }

  update(id: string, updateEpisodeDto: UpdateEpisodeDto) {
    // 1. find the position of the episode with this id
    const episodeIndex = this.indexOrThrow(id);

    // 2. merge: the existing episode, with the changes on top
    const merge = { ...this.episodes[episodeIndex], ...updateEpisodeDto };

    // 3. put the merged episode back at that position
    this.episodes.splice(episodeIndex, 1, merge);

    // 4. return it
    return merge;
  }

  remove(id: string) {
    const episodeIndex = this.episodes.findIndex(
      (episode) => episode.id === id,
    );
    if (episodeIndex === -1) {
      throw new NotFoundException(`Episode ${id} not found`);
    }
    this.episodes.splice(episodeIndex, 1);
  }
}
