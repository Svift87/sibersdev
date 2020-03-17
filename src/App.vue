<template>
  <div id="app">
    <div class="container">  
      <div class="header">
        <h1 class="header__title">Книга контактов</h1>
      </div> 
      <div class="nav">        
        <div class="search">
          <label for="searchInput" class="search__lable bold">Поиск по имени</label>
          <input id="searchInput" class="search__input" type="text" v-model="searchName">        
        </div>
        <div class="sort">
          <button class="btn sort__btn" @click="sortName">Сортировка по первой букве</button>
        </div>
      </div>
      <!-- <ul>
        <li v-for="letter in result" :key="letter.id">
          <button class="btn" @click="sortLetter(letter)">{{letter}}</button>
        </li>
      </!--> -->
      <div class="main">
        <ul class="main__item">
          <li class="main__list" v-for="item in filteredList" :key="item.id">
            <div class="main__contaier main__contaier--img">
              <img class="main__img" :src="item.avatar" alt="">
            </div>
            <div class="main__block">
              <div class="main__contaier main__contaier--man">
                <p class="main__info"><span class="bold">Name:</span> {{item.name}}</p>
                <p class="main__info"><span class="bold">Email:</span> {{item.email}}</p>
                <p class="main__info"><span class="bold">Phone:</span> {{item.phone}}</p>
                <p class="main__info"><span class="bold">Website:</span> {{item.website}}</p>
                <p class="main__info"><span class="bold">Company:</span> {{item.company.name}}</p>
              </div>
              <div class="main__contaier main__contaier--adress">
                <p class="main__center"><span class="bold">Address</span> </p>
                <ul class="main__item--adress">
                  <li class="main__list--adress"><span class="bold">State:</span> {{item.address.state}}</li>
                  <li class="main__list--adress"><span class="bold">City:</span> {{item.address.city}}</li>
                  <li class="main__list--adress"><span class="bold">StreetA:</span> {{item.address.streetA}}</li>                   
                  <li class="main__list--adress"><span class="bold">StreetB:</span> {{item.address.streetB}}</li>                   
                  <li class="main__list--adress"><span class="bold">StreetC:</span> {{item.address.streetC}}</li>                   
                  <li class="main__list--adress"><span class="bold">StreetD:</span> {{item.address.streetD}}</li>                   
                </ul>
              </div>
            </div>
            <button class="main__detail btn" @click="popapDetail(item)">Подробнее</button>
          </li>          
        </ul>
      </div>
    </div>
    <div class="popap detail" v-if="popapDetailShow">
      <div class="background" @click="popapDetailShow = !popapDetailShow"></div>
      <div class="detail__container">
        <div class="detail__content">
          <h2 class="detail__header">
            Добавить контакт
          </h2>          
          <div class="detail__block">
            <div class="detail__block--input">
              <label for="popapAdded_1" class="detail__label">Name</label>
              <input type="text" id="popapAdded_1" class="detail__input" v-model="popapDetailArr.name">
            </div>
            <div class="detail__block--input">
              <label for="popapAdded_2" class="detail__label">Email</label>
              <input type="text" id="popapAdded_2" class="detail__input" v-model="popapDetailArr.email">
            </div>
            <div class="detail__block--input">
              <label for="popapAdded_3" class="detail__label">Phone</label>
              <input type="text" id="popapAdded_3" class="detail__input" v-model="popapDetailArr.phone">
            </div>
            <div class="detail__block--input">
              <label for="popapAdded_4" class="detail__label">Website</label>
              <input type="text" id="popapAdded_4" class="detail__input" v-model="popapDetailArr.website">
            </div>
            <div class="detail__block--input">
              <label for="popapAdded_5" class="detail__label">Company</label>
              <input type="text" id="popapAdded_5" class="detail__input" v-model="popapDetailArr.company.name">
            </div>
            <div class="detail__block--input">
              <label for="popapAdded_6" class="detail__label">State</label>
              <input type="text" id="popapAdded_6" class="detail__input" v-model="popapDetailArr.address.state">
            </div>
            <div class="detail__block--input">
              <label for="popapAdded_7" class="detail__label">City</label>
              <input type="text" id="popapAdded_7" class="detail__input" v-model="popapDetailArr.address.city">
            </div>
            <div class="detail__block--input">
              <label for="popapAdded_8" class="detail__label">StreetA</label>
              <input type="text" id="popapAdded_8" class="detail__input" v-model="popapDetailArr.address.streetA">
            </div>
            <div class="detail__block--input">
              <label for="popapAdded_9" class="detail__label">StreetB</label>
              <input type="text" id="popapAdded_9" class="detail__input" v-model="popapDetailArr.address.streetB">
            </div>
            <div class="detail__block--input">
              <label for="popapAdded_10" class="detail__label">StreetC</label>
              <input type="text" id="popapAdded_10" class="detail__input" v-model="popapDetailArr.address.streetC">
            </div>
            <div class="detail__block--input">
              <label for="popapAdded_11" class="detail__label">StreetD</label>
              <input type="text" id="popapAdded_11" class="detail__input" v-model="popapDetailArr.address.streetD">
            </div>
          </div>
          <button class="popap__btn btn" @click="popapDetailShow = !popapDetailShow">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      posts: [],
      active: 0,
      searchName: '',
      popapDetailShow: false,
      popapDetailArr: [],
      // result: []
    }
  },
  methods: {
    getPosts () {
      let arr = []
      this.$http.get('http://demo.sibers.com/users')
        .then(response => {
          this.posts = response.data;
          
          // for (let i = 0; response.data.length > i; i++) {      
          //   arr.push(response.data[i].name.substr(0, 1).toUpperCase())
          // }          
        })        

      // setTimeout(() => {
      //   for (let str of arr) {
      //     if (!this.result.includes(str)) {
      //       this.result.push(str);
      //     }
      //   }
      // }, 200);
    },
    popapDetail (elem) {
      this.popapDetailArr = elem
      this.active = elem.id
      this.popapDetailShow = true
    },
    sortName() {
      return this.posts.sort((a, b) => { 
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    },
    // sortLetter(ad) {
    //   return this.posts.sort(function (elem) {
    //     return elem.name.substr(0, 1).indexOf(ad) !== -1       
    //   })
    // }
  },
  created () {
    this.getPosts()    
  },
  computed: {
    filteredList: function(){
      let searchName = this.searchName;
      return this.posts.filter(function (elem) {
        return elem.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1;
      })
    }
  }
}
</script>
