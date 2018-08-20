import { PhotoPage } from "./../photo/photo";
import { OptionsPage } from "./../options/options";
import { CustomiseProfilePage } from "./../customise-profile/customise-profile";
import { AngularFirestore } from "angularfire2/firestore";
import { AuthService } from "./../../services/auth.service";
import { User } from "./../../app/models/user.interface";
import { Photo } from "./../../app/models/photo.interface";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  public user: User = {
    name: "",
    username: "",
    email: "",
    biography: ""
  };
  public imageSource: string =
    "https://instagram.fakl1-2.fna.fbcdn.net/vp/36bedd66b5fa8b8f6bf81650823a72f0/5BFC9C56/t51.2885-19/s150x150/38096749_208075379863871_8613051600635691008_n.jpg";
  public postedPhotos: Photo[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthService,
    private firestore: AngularFirestore
  ) {
    this.getUser();
    this.getPostedPhotos();
  }

  getUser() {
    this.firestore
      .collection("users")
      .doc(this.auth.getUID())
      .valueChanges()
      .subscribe((user: User) => {
        this.user = user;
      });
  }

  getPostedPhotos() {
    this.firestore
      .collection("users")
      .doc(this.auth.getUID())
      .collection("photos")
      .valueChanges()
      .subscribe(photos => {
        photos.forEach((photoData: Photo) => {
          const photo: Photo = {
            description: photoData.description,
            locationDescription: photoData.locationDescription,
            coordinates: photoData.coordinates,
            timestamp: photoData.timestamp,
            url: photoData.url
          };
          this.postedPhotos[this.postedPhotos.length] = photo;
          console.log(photo.description);
        });
      });
  }

  optionsButtonClicked() {
    this.navCtrl.push(OptionsPage);
  }

  openPhoto(userID: string, photoID: string) {
    this.navCtrl.push(PhotoPage, {
      userID: userID,
      photoID: photoID,
      source: "profile"
    });
  }

  ionViewDidLoad() {
    this.getUser();
  }
}
