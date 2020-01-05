import { Component, OnInit } from '@angular/core';
import { IBand } from '../../../model/band.model';
import { BandService } from './services/band.service';
import { ISet } from '../../../model/set.model';
import { ISong } from '../../../model/song.model';
import { SetService } from './services/set.service';
import { SongService } from './services/song.service';
import { UserService } from './services/user.service';
import { IUser } from '../../../model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public user!: IUser;
  public band!: IBand;
  public setlists!: ISet[];
  public songs!: ISong[];
  public loading: boolean;

  public constructor(
    private userService: UserService,
    private bandService: BandService,
    private setService: SetService,
    private songService: SongService) {
    this.loading = true;
  }

  public async ngOnInit() {
    this.user = await this.userService.getUser();
    this.band = await this.bandService.getBand(this.user.bands[0]);
    this.setlists = await this.setService.getSets(this.band.id);
    this.songs = await this.songService.getSongs(this.band.id);
    this.loading = false;
  }

  public findSongById(songId: string): ISong {
    return this.songs.find(s => s.id === songId);
  }
}
