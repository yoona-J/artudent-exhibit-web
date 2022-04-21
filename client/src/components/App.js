import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import MainPage from "./views/MainPage/MainPage";
import ExhibitPage from './views/ExhibitPage/ExhibitPage';
import LibraryPage from './views/Library/Library';
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import UploadProductPage from './views/UploadProductPage/UploadProductPage';
import MyPage from './views/MyPage/Mypage';
import MyUpload from './views/MyPage/MyUpload/MyUpload';
import ServiceCenter from './views/LoginPage/ServiceCenter';
import DetailProductPage from './views/DetailProductPage/DetailProductPage';

//ExhibitionPage
// import ExhibitPage1 from './views/ExhibitPage/ExhibitionPages/first.html';

//null   Anyone Can go inside
//true   only logged in user can go inside  -> 로그인 한 상태에서만 나타나도록 지정
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(MainPage, null)} />
          <Route exact path="/exhibition" component={Auth(ExhibitPage, null)} />
          <Route exact path="/artwork" component={Auth(LandingPage, null)} />
          <Route exact path="/library" component={Auth(LibraryPage, true)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
          <Route exact path="/mypage" component={Auth(MyPage, true)} />
          <Route exact path="/mypage/:userId" component={Auth(MyUpload, true)} />
          <Route exact path="/service" component={Auth(ServiceCenter, null)} />

          {/* ArtworkDetailPage */}
          <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />

          {/* ExhibitionPage*/}
          {/* <Route exact path="/exhibition/1" component={Auth(ExhibitPage1, null)} /> */}
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
