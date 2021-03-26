const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

//Xu li hieu ung xoay cua thumb
const imgRotate = $('.song-img img').animate([
    {transform:'rotate(360deg)'}
], {
    duration:10000,
    iterations: Infinity
});
imgRotate.pause();

const app= {
    currentIndex: 0,
    isPlaying: false,
    isTimeUpdate: true,
    isRandomSong: false, 
    isRepeat: false,
    isRepeatAll:false,
    songs: [
        {
            name:'3107',
            singer: 'Duong Nau',
            path: './music/3107.mp3',
            img: './img/3107.jpg'
        },
        {
            name:'3107-2',
            singer: 'Duong Nau',
            path: './music/31072.mp3',
            img: './img/31072.jpg'
        },
        {
            name:'Chan Ai',
            singer: 'Orange, Khoi',
            path: './music/ChanAi.mp3',
            img: './img/chanai.jpg'
        },
        {
            name:'Hay trao cho anh',
            singer: 'Son Tung MTP',
            path: './music/HayTraoChoAnh.mp3',
            img: './img/haytraochoanh.jpg'
        },
        {
            name:'Nang tho',
            singer: 'Hoang Dung',
            path: './music/NangTho.mp3',
            img: './img/nangtho.jpg'
        },
        {
            name:'Nhung ke mong mo',
            singer: 'Noo Phuong Thinh',
            path: './music/NhungKeMongMo.mp3',
            img: './img/nhungkemongmo.jpg'
        },
        {
            name:'Tinh ban dieu ki',
            singer: 'Amee, Ricky Star, Lang LD',
            path: './music/TinhBanDieuKy.mp3',
            img: './img/tinhbandieuky.jpg'
        },
        {
            name:'Tren tinh ban duoi tinh yeu',
            singer: 'Min',
            path: './music/TrenTinhBanDuoiTinhYeu.mp3',
            img: './img/trentinhbanduoitinhyeu.jfif'
        },
        {
            name:'1 Phut',
            singer: 'Andiez',
            path: './music/1Phut.mp3',
            img: './img/1Phut.jpg'
        },
        {
            name:'Anh nang cua anh',
            singer: 'Duc Phuc',
            path: './music/AnhNangCuaAnh.mp3',
            img: './img/AnhNangCuaAnh.jpg'
        },
        {
            name:'Chi Can Minh Thuong Nhau',
            singer: 'Andiez',
            path: './music/ChiCanMinhThuongNhau.mp3',
            img: './img/ChiCanMinhThuongNhau.jpg'
        },
        {
            name:'Gia ngay dau dung noi thuong nhau',
            singer: 'Andiez',
            path: './music/GiaNgayDauDuongNoiThuongNhau.mp3',
            img: './img/GiaNgayDauDungNoiThuongNhau.jpg'
        },
        {
            name:'Hen mot mai',
            singer: 'Duc Phuc',
            path: './music/HenMotMai.mp3',
            img: './img/HenMotMai.jpg'
        },
        {
            name:'Lac nhau co phai muon doi',
            singer: 'Erik',
            path: './music/LacNhauCoPhaiMuonDoi.mp3',
            img: './img/LacNhauCoPhaiMuonDoi.jpg'
        },
        {
            name:'Manh ghep',
            singer: 'Andiez',
            path: './music/ManhGhep.mp3',
            img: './img/ManhGhep.jpg'
        },
        {
            name:'Suyt nua thi',
            singer: 'Andiez',
            path: './music/SuytNuaThi.mp3',
            img: './img/SuytNuaThi.jpg'
        },
        {
            name:'Thi thoi',
            singer: 'Andiez',
            path: './music/ThiThoi.mp3',
            img: './img/ThiThoi.jfif'
        },
        {
            name:'Vai giay nua thoi',
            singer: 'Andiez',
            path: './music/VaiGiayNuaThoi.mp3',
            img: './img/VaiGiayNuaThoi.jpg'
        },
        {
            name:'Vo',
            singer: 'Duc Phuc',
            path: './music/Vo.mp3',
            img: './img/Vo.jpg'
        },
        {
            name:'Yeu di dung so',
            singer: 'Only C',
            path: './music/YeuDiDungSo.mp3',
            img: './img/YeuDiDungSo.jpg'
        },
        {
            name:'Yeu La Tha Thu',
            singer: 'Only C',
            path: './music/YeuLaThaThu.mp3',
            img: './img/YeuLaThaThu.jpg'
        },
        {
            name:'Dau de truong thanh',
            singer: 'Only C',
            path: './music/DauDeTruongThanh.mp3',
            img: './img/DauDeTruongThanh.jpg'
        },
        {
            name:'Nao ca vang',
            singer: 'Only C',
            path: './music/NaoCaVang.mp3',
            img: './img/NaoCavang.jpg'
        }
    ],
    render: function(){
        const htmls = this.songs.map((song,index) => {
            return `
                <div class="song" data-index="${index}">
                    <img src="${song.img}" alt="">
                    <div class="song-des-r">
                        <h4 class="song-name-r">${song.name}</h4>
                        <p class="singer">${song.singer}</p>
                    </div>
                </div>
            `
        })
        $('.playlist-songs').innerHTML = htmls.join('');
    },
    defineProperties: function(){
        Object.defineProperty(this,"currentSong",{
            get: function(){
                return this.songs[this.currentIndex];
            }
        });
    },
    handleEvents: function(){
        //click play va pause
        $('.icon-playing').onclick = function(){ 
            if(app.isPlaying){
                audio.pause();
                imgRotate.pause();
                $('.icon-playing').classList.remove('playing');
                app.isPlaying=false;
            }
            else{
                audio.play();
                imgRotate.play();
                $('.icon-playing').classList.add('playing');
                app.isPlaying=true;
            }
        }

        //Tua, click progress
        audio.ontimeupdate= function(){
            if(audio.duration){
                if(app.isTimeUpdate){
                    $('.progress').value=Math.floor(audio.currentTime*100/audio.duration);  
                } 
            }  
            //Ket thuc 1 bai hat
            if(audio.ended){
                //lap lai tat ca
                if(app.isEnd()&&app.isRepeatAll){
                    app.currentIndex++;
                    app.nextSong();
                    app.playSong();
                }
                else{
                    if(app.isEnd()&&!app.isRandomSong&&!app.isRepeat){
                        audio.pause();
                        imgRotate.pause();
                        $('.icon-playing').classList.remove('playing');
                        app.isPlaying=false;
                    }
                    else{
                        if(app.isRepeat){
                            app.playSong();
                        }
                        else{
                            //co bat random
                            if(!app.isRandomSong){
                                app.nextSong();
                                app.playSong(); 
                            }
                            else{
                                app.randomSong();
                                app.playSong();
                            }
                        }
                    }
                }
            }
        }
        $('.progress').onmousedown = function(e){
            app.isTimeUpdate=false;
         }       
        $('.progress').onchange = function(e){
            app.isTimeUpdate=true;
            audio.currentTime= (parseInt(e.target.value)*audio.duration/100);
        }//ket thuc su kien tua

        //click vao nut next
        $('.icon-next').onclick = function(){
            if(!app.isRandomSong){
                app.nextSong();
                app.playSong();
            }
            else{
                app.randomSong();
                app.playSong();
            }
        }

        //click nut pre
        $('.icon-pre').onclick = function(){
            if(!app.isRandomSong){
                app.preSong();
                app.playSong();
            }
            else{
                app.randomSong();
                app.playSong();
            }
        }

        //click nut mix
        $('.icon-mix').onclick = function(){
            if(app.isRandomSong){
                $('.icon-mix').classList.remove('icon-mix-active');
                app.isRandomSong=false;
            }
            else{
                $('.icon-mix').classList.add('icon-mix-active');
                app.isRandomSong=true;
            }
        }

        //click nut repeat
        $('.icon-repeat').onclick = function(){
            if(!app.isRepeat&&!app.isRepeatAll){
                this.classList.add('icon-repeat-active-all');
                app.isRepeatAll=true;
            }
            else if(!app.isRepeat&&app.isRepeatAll){
                this.classList.remove('icon-repeat-active-all');
                this.classList.add('icon-repeat-active');
                app.isRepeatAll=false;
                app.isRepeat= true;
            }
            else if(app.isRepeat&&!app.isRepeatAll){
                this.classList.remove('icon-repeat-active');
                app.isRepeatAll=false;
                app.isRepeat= false;
            }
        }

        //click 1 bai hat
        $('.playlist-songs').onclick= function(e){
            for(var i=0; i<app.songs.length;i++){
                $$('.song')[i].classList.remove('song-active')
            }
            const songNode = e.target.closest('.song');
            if(songNode){

                const temp= songNode.getAttribute('data-index')
                app.currentIndex=parseInt(temp);
                app.playSong();
                songNode.classList.add('song-active')
            }
        }
    }, 

    //Lay bai hat hien tai
    loadCurrentSong: function(){
        $('.song-img img').src=this.currentSong.img;
        $('.song-name').textContent=this.currentSong.name;
        $('.author').textContent=this.currentSong.singer;
        $('#audio').src=this.currentSong.path;
    },

    //LAY bai hat ke tiep
    nextSong: function(){
        if(app.currentIndex>=app.songs.length){
            app.currentIndex=0
        }
        else{
            app.currentIndex++;
        }
    },

    //lay bai hat truoc
    preSong: function(){
        if(app.currentIndex<=0){
            app.currentIndex=app.songs.length;
        }
        else{
            app.currentIndex--;
        }
    },

    //lay random 1 bai hat
    randomSong: function(){
        var temp ;
        do{
            temp= Math.floor(Math.random()*(app.songs.length));
        }while(temp===app.currentIndex)
        app.currentIndex=temp;
    },

    //den cuoi danh sach 
    isEnd: function(){
        if(app.currentIndex===app.songs.length-1){
            return true;
        }
        else{
            return false;
        }
    },

    //phat bai hat hien tai
    playSong: function(){
        app.loadCurrentSong();
        $('.icon-playing').classList.remove('playing');
        $('.icon-playing').classList.add('playing');
        audio.play();
        const temp = app.currentIndex;
        for(var i=0; i<app.songs.length;i++){
            $$('.song')[i].classList.remove('song-active')
        }
        $$('.song')[temp].classList.add('song-active');
        $$('.song')[temp].scrollIntoView();
        imgRotate.pause();
        imgRotate.play();
    },
    
    start: function(){
        this.defineProperties();
        this.render();
        this.handleEvents();
        this.loadCurrentSong();
        const temp = app.currentIndex;
        for(var i=0; i<app.songs.length;i++){
            $$('.song')[i].classList.remove('song-active')
        }
        $$('.song')[temp].classList.add('song-active');   
    }
}

app.start();