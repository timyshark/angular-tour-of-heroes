import { Component, OnInit , Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  constructor(
    private route: ActivatedRoute,  //<-- the routing url . contains the parameters hero.id
    private heroService: HeroService, // <-- the HeroService used to fetch the hero record from the remote server
    private location: Location) //<-- The location service to interact with the browser : to redirect /reroute the url
    { }

    ngOnInit(): void {
      this.getHero();
    }
    
    getHero(): void {
      const id = +this.route.snapshot.paramMap.get('id'); //snapshot is static image of the route info, shortly after component was created
      this.heroService.getHero(id)  //Get the Hero record from the remote server using the HeroService
        .subscribe(hero => this.hero = hero);
    }
    goBack(): void {
      this.location.back();
    }

    save(): void {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
}
