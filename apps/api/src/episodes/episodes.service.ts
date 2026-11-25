import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import type {Episode} from "./entities/episode.entity"

@Injectable()
export class EpisodesService {
  private episodes:Episode[] = [
    {
  version:1,
  id: "ep-01",
  title: "Sample episode",
  mediaFile: "sample.mp4",
  requiredRegions: [
    { id: "r1", start: 3, end: 7, label: "Intro point" },
    { id: "r2", start: 12, end: 17, label: "Key takeaway" }
  ]
}

  ];
  create(createEpisodeDto: CreateEpisodeDto) {
    return 'This action adds a new episode';
  }

  findAll() {
    return this.episodes;
    //return `This action returns all episodes`;
  }

  findOne(id: string) {
    const episode = this.episodes.find(episode => episode.id === id);

    if(!episode){
      throw new NotFoundException('No such episode exists');
    }
    return episode;
    
    //return `This action returns a #${id} episode`;
  }

  update(id: string, updateEpisodeDto: UpdateEpisodeDto) {
    return `This action updates a #${id} episode`;
  }

  remove(id: string) {
    return `This action removes a #${id} episode`;
  }
}
