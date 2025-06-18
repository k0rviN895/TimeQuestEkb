import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
  Animated,
  ScrollView,
  Dimensions,
  Modal,
  Alert
} from 'react-native';
import { WebView } from 'react-native-webview';
import React, { useState, useRef, useEffect } from 'react';
import { TextInput } from 'react-native';


const { width, height } = Dimensions.get('window');

// Обновленная современная цветовая палитра
const colors = {
  primary: '#4CAF50',
  primaryLight: '#81C784',
  primaryDark: '#388E3C',
  accent: '#8BC34A',
  text: '#212121',
  textSecondary: '#757575',
  background: '#F5F5F5',
  divider: '#E0E0E0',
  error: '#F44336',
  success: '#4CAF50',
  warning: '#FFC107',
  darkBackground: '#2E7D32',
  cardBackground: '#FFFFFF',
  mapMarker: '#43A047',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#9E9E9E',
  lightGray: '#EEEEEE'
};

// Полные данные для всех маркеров по векам с описаниями
const markersData = {
  '21 век': {
    'Екатеринбург': {
      image: require('./assets/21/ekb.jpg'),
      description: 'В 1924-1991 годах город назывался Свердловск. Крупный промышленный центр СССР. В годы ВОВ - эвакуация более 50 предприятий.'
    },
    'Храм Большой Златоуст': {
      image: require('./assets/21/zlatoust.jpg'),
      description: 'Оригинальный храм взорван в 1930 году. На его месте долгое время был пустырь, затем сквер. Колокола переплавлены для нужд индустриализации.'
    },
    'Уральский Федеральный Университет': {
      image: require('./assets/21/urfu.jpg'),
      description: 'В 1920 году основан Уральский университет, в 1948 - Уральский политехнический институт. В советское время - кузница инженерных кадров. Во время ВОВ разрабатывались оборонные технологии.'
    },
    'Храм-на-Крови': {
      image: require('./assets/21/hram-na-krovi.jpg'),
      description: 'Дом Ипатьева снесен в 1977 году по решению Политбюро ЦК КПСС. На этом месте был пустырь, затем установлен памятный крест.'
    },
    'Дом Н. И. Севастьянова': {
      image: require('./assets/21/sevastyanov.jpg'),
      description: 'В советское время здесь размещались Уральский совнархоз, обком КПСС. В 1970-х годах здание находилось в аварийном состоянии.'
    },
    'Памятник клавиатуре': {
      image: require('./assets/21/keyboard.jpg'),
      description: 'В XX веке на этом месте были жилые дома и производственные помещения. В 1980-х - складские территории.'
    },
    'Ельцин Центр': {
      image: require('./assets/21/elcin-center.jpg'),
      description: 'В XX веке на этом месте находились различные административные здания.'
    },
    'Бизнес-центр "Высоцкий"': {
      image: require('./assets/21/vysotsky.png'),
      description: 'В XX веке на этом месте находились жилые кварталы и небольшие предприятия.'
    },
    'Екатеринбург Арена': {
      image: require('./assets/21/arena.jpg'),
      description: 'В XX веке на этом месте находился старый стадион.'
    },
    'Новая набережная реки Исеть': {
      image: require('./assets/21/naberezhnaya.jpg'),
      description: 'В XX веке набережная имела промышленный характер с причалами и складами.'
    },
    'ТЦ "Алатырь"': {
      image: require('./assets/21/alatyr.jpg'),
      description: 'В XX веке на этом месте находился центральный рынок города.'
    },
    'Дом Правительства Свердловской области': {
      image: require('./assets/20/government.jpg'),
      description: 'Построен в 1930-е годы в стиле конструктивизма. Во время ВОВ здесь размещался штаб Уральского военного округа. Символ советской власти.'
    },
    'Уралмаш': {
      image: require('./assets/21/uralmash.jpg'),
      description: 'Один из крупнейших машиностроительных заводов СССР, основанный в 1933 году. В годы ВОВ производил танки Т-34. Сформировал социальную инфраструктуру района.'
    },
    'Цирк': {
      image: require('./assets/21/circus.jpg'),
      description: 'Первый стационарный цирк в городе, открытый в 1980 году. Вместимость: 2000 зрителей. Назван в честь Валентина Филатова. Уникальная архитектура в виде купола.'
    },
    'Мемориал на площади 1905 года': {
      image: require('./assets/21/memorial.webp'),
      description: 'Мемориал был установлен в память о жертвах политических репрессий. Автор мемориала - известный скульптор Эрнст Неизвестный. Символизирует маску скорби.'
    },
    'Парк Маяковского': {
      image: require('./assets/21/park.jpg'),
      description: 'Один из первых общественных парков отдыха, созданных для горожан. Парк назван в честь поэта Владимира Маяковского. Имел аттракционы и летний кинотеатр.'
    },
    'Малая Свердловская железная дорога': {
      image: require('./assets/21/mal_railway.jpeg'),
      description: 'Открыта в 1960 году на территории Парка имени В. В. Маяковского. Детская железная дорога для обучения и развлечения.'
    },
    'Дом Севастьянова': {
      image: require('./assets/20/sevastyanov.jpg'),
      description: 'В XX веке здание использовалось для административных нужд.'
    },
    'Театр оперы и балета': {
      image: require('./assets/21/theater.png'),
      description: 'Советский период театра с классическими постановками.'
    },
    'Торговые ряды': {
      image: require('./assets/vopros.png'),
      description: 'В XX веке торговые ряды были национализированы и преобразованы.'
    },
    'Екатеринбургская плотина': {
      image: require('./assets/21/dam.jpg'),
      description: 'В XX веке плотина была реконструирована и продолжала использоваться.'
    },
    'Екатеринбургский завод': {
      image: require('./assets/vopros.png'),
      description: 'В XX веке завод был расширен и модернизирован.'
    },
    'Домики мастеровых': {
      image: require('./assets/21/workers-houses.jpg'),
      description: 'В XX веке первые дома рабочих были снесены или перестроены.'
    },
    'Городская управа': {
      image: require('./assets/21/city-hall.jpg'),
      description: 'В XX веке здание использовалось советскими органами власти.'
    },
    'Первая церковь': {
      image: require('./assets/21/church.jpg'),
      description: 'В XX веке церковь была закрыта или разрушена.'
    },
    'Первая школа': {
      image: require('./assets/21/school.jpg'),
      description: 'В XX веке школа продолжала работать в новом здании.'
    },
    'Белая башня>': {
      image: require('./assets/21/white-tower.jpg'),
      description: 'Водонапорная башня УЗТМ, построенная в 1929-1931 гг. в стиле конструктивизма. Символ индустриального Екатеринбурга и памятник архитектуры федерального значения.'
    }
  },
  '20 век': {
    'Екатеринбург': {
      image: require('./assets/20/ekb.jpg'),
      description: 'В 1924-1991 годах город назывался Свердловск. Крупный промышленный центр СССР. В годы ВОВ - эвакуация более 50 предприятий.'
    },
    'Храм Большой Златоуст': {
      image: require('./assets/20/zlatoust.jpg'),
      description: 'Оригинальный храм взорван в 1930 году. На его месте долгое время был пустырь, затем сквер. Колокола переплавлены для нужд индустриализации.'
    },
    'Уральский Федеральный Университет': {
      image: require('./assets/20/urfu.jpg'),
      description: 'В 1920 году основан Уральский университет, в 1948 - Уральский политехнический институт. В советское время - кузница инженерных кадров. Во время ВОВ разрабатывались оборонные технологии.'
    },
    'Храм-на-Крови': {
      image: require('./assets/20/hram-na-krovi.jpg'),
      description: 'Дом Ипатьева снесен в 1977 году по решению Политбюро ЦК КПСС. На этом месте был пустырь, затем установлен памятный крест.'
    },
    'Дом Н. И. Севастьянова': {
      image: require('./assets/20/sevastyanov.jpg'),
      description: 'В советское время здесь размещались Уральский совнархоз, обком КПСС. В 1970-х годах здание находилось в аварийном состоянии.'
    },
    'Памятник клавиатуре': {
      image: require('./assets/20/keyboard.jpg'),
      description: 'В XX веке на этом месте были жилые дома и производственные помещения. В 1980-х - складские территории.'
    },
    'Ельцин Центр': {
      image: require('./assets/20/elcin-center.jpg'),
      description: 'В XX веке на этом месте находились различные административные здания.'
    },
    'Бизнес-центр "Высоцкий"': {
      image: require('./assets/20/vysotsky.jpeg'),
      description: 'В XX веке на этом месте находились жилые кварталы и небольшие предприятия.'
    },
    'Екатеринбург Арена': {
      image: require('./assets/20/arena.jpg'),
      description: 'В XX веке на этом месте находился старый стадион.'
    },
    'Новая набережная реки Исеть': {
      image: require('./assets/20/naberezhnaya.jpg'),
      description: 'В XX веке набережная имела промышленный характер с причалами и складами.'
    },
    'ТЦ "Алатырь"': {
      image: require('./assets/20/alatyr.jpg'),
      description: 'В XX веке на этом месте находился центральный рынок города.'
    },
    'Парк "Гора Крестов"': {
      image: require('./assets/vopros.png'),
      description: 'В XX веке это место было малоизвестным и неблагоустроенным.'
    },
    'Дом Правительства Свердловской области': {
      image: require('./assets/20/government.jpg'),
      description: 'Построен в 1930-е годы в стиле конструктивизма. Во время ВОВ здесь размещался штаб Уральского военного округа. Символ советской власти.'
    },
    'Уралмаш': {
      image: require('./assets/20/uralmash.jpg'),
      description: 'Один из крупнейших машиностроительных заводов СССР, основанный в 1933 году. В годы ВОВ производил танки Т-34. Сформировал социальную инфраструктуру района.'
    },
    'Цирк': {
      image: require('./assets/20/circus.jpg'),
      description: 'Первый стационарный цирк в городе, открытый в 1980 году. Вместимость: 2000 зрителей. Назван в честь Валентина Филатова. Уникальная архитектура в виде купола.'
    },
    'Мемориал на площади 1905 года': {
      image: require('./assets/20/memorial.webp'),
      description: 'Мемориал был установлен в память о жертвах политических репрессий. Автор мемориала - известный скульптор Эрнст Неизвестный. Символизирует маску скорби.'
    },
    'Парк Маяковского': {
      image: require('./assets/20/park.jpg'),
      description: 'Один из первых общественных парков отдыха, созданных для горожан. Парк назван в честь поэта Владимира Маяковского. Имел аттракционы и летний кинотеатр.'
    },
    'Малая Свердловская железная дорога': {
      image: require('./assets/20/mal_railway.jpeg'),
      description: 'Открыта в 1960 году на территории Парка имени В. В. Маяковского. Детская железная дорога для обучения и развлечения.'
    },
    'Дом Севастьянова': {
      image: require('./assets/20/sevastyanov.jpg'),
      description: 'В XX веке здание использовалось для административных нужд.'
    },
    'Театр оперы и балета': {
      image: require('./assets/20/theater.jpg'),
      description: 'Советский период театра с классическими постановками.'
    },
    'Торговые ряды': {
      image: require('./assets/vopros.png'),
      description: 'В XX веке торговые ряды были национализированы и преобразованы.'
    },
    'Екатеринбургская плотина': {
      image: require('./assets/20/dam_20.jpg'),
      description: 'В XX веке плотина была реконструирована и продолжала использоваться.'
    },
    'Екатеринбургский завод': {
      image: require('./assets/vopros.png'),
      description: 'В XX веке завод был расширен и модернизирован.'
    },
    'Домики мастеровых': {
      image: require('./assets/21/workers-houses.jpg'),
      description: 'В XX веке первые дома рабочих были снесены или перестроены.'
    },
    'Городская управа': {
      image: require('./assets/20/city-hall.jpg'),
      description: 'В XX веке здание использовалось советскими органами власти.'
    },
    'Первая церковь': {
      image: require('./assets/20/church.jpg'),
      description: 'В XX веке церковь была закрыта или разрушена.'
    },
    'Первая школа': {
      image: require('./assets/20/school.jpg'),
      description: 'В XX веке школа продолжала работать в новом здании.'
    },
    'Белая башня>': {
    image: require('./assets/20/white-tower20.jpg'),
    description: 'Водонапорная башня УЗТМ, построенная в 1929-1931 гг. в стиле конструктивизма. Символ индустриального Екатеринбурга и памятник архитектуры федерального значения.'
    }
  },
   '19 век': {
    'Екатеринбург': {
      image: require('./assets/19/ekb.jpg'),
      description: 'Уездный город Пермской губернии. Крупный центр металлургии и торговли. Население в 1897 году: 43 тысячи человек.'
    },
    'Храм Большой Златоуст': {
      image: require('./assets/19/zlatoust.jpg'),
      description: 'Построен в 1847-1876 годах на средства купцов Казанцевых. Высота колокольни: 77 метров. Главный колокол весил 16 тонн.'
    },
    'Уральский Федеральный Университет': {
      image: require('./assets/default-image.png'),
      description: 'На этом месте находились жилые особняки и торговые лавки. В конце века - здание городской управы.'
    },
    'Храм-на-Крови': {
      image: require('./assets/19/hram-na-krovi.jpg'),
      description: 'Особняк горного инженера Ипатьева построен в 1880-х годах. Двухэтажный каменный дом в стиле модерн.'
    },
    'Дом Н. И. Севастьянова': {
      image: require('./assets/19/sevastyanov.jpg'),
      description: 'Построен в 1866 году для чиновника Н.И. Севастьянова. Единственный в городе образец неоготики с мавританскими мотивами.'
    },
    'Набережная реки Исеть': {
      image: require('./assets/19/naberezhnaya.jpeg'),
      description: 'В XIX веке набережная была неблагоустроенной, с причалами для лодок и складами.'
    },
    'Дом Правительства Свердловской области': {
      image: require('./assets/19/government.jpg'),
      description: 'В XIX веке на этом месте находилось здание городской думы.'
    },
    'Мемориал на площади 1905 года': {
      image: require('./assets/vopros.png'),
      description: 'В XIX веке это была главная торговая площадь города.'
    },
    'Парк Маяковского': {
      image: require('./assets/19/park.jpg'),
      description: 'Заложен в конце XIX века как городской сад. Место отдыха горожан и проведения культурных мероприятий.'
    },
    'Дом Севастьянова': {
      image: require('./assets/19/sevastyanov.jpg'),
      description: 'Построен в 1865 году в стиле классицизма. Принадлежал купцу Александру Севастьянову, символ богатства екатеринбургского купечества.'
    },
    'Театр оперы и балета': {
      image: require('./assets/19/theater.jpg'),
      description: 'Первый стационарный театр города, открытый в конце XIX века. Вмещал до 800 зрителей, получил прозвище "Белый лебедь".'
    },
    'Торговые ряды': {
      image: require('./assets/vopros.png'),
      description: 'Центр торговли города в XIX веке. Здесь располагались магазины и торговые лавки купцов.'
    },
    'Екатеринбургская плотина': {
      image: require('./assets/19/dam.png'),
      description: 'В XIX веке плотина продолжала работать, обеспечивая энергией заводы.'
    },
    'Екатеринбургский завод': {
      image: require('./assets/19/factory.png'),
      description: 'В XIX веке завод продолжал работать, но уже не был основным предприятием города.'
    },
    'Домики мастеровых': {
      image: require('./assets/vopros.png'),
      description: 'В XIX веке первые дома рабочих были перестроены или снесены.'
    },
    'Городская управа': {
      image: require('./assets/vopros.png'),
      description: 'Административный центр города в XIX веке. Здесь принимались важные решения о развитии города.'
    },
    'Первая церковь': {
      image: require('./assets/19/church.png'),
      description: 'В XIX веке церковь была перестроена в камне.'
    },
    'Первая школа': {
      image: require('./assets/19/school.png'),
      description: 'Первая школа Екатеринбурга была основана в 1724 году по распоряжению Вильгельма де Геннина при Екатеринбургском заводе.'
    }
  },
  '18 век': {
    'Екатеринбург': {
      image: require('./assets/18/ekb.jpg'),
      description: 'Основан в 1723 году как железоделательный завод. Крепость и административный центр горнозаводской промышленности Урала.'
    },
    'Храм Большой Златоуст': {
      image: require('./assets/18/zlatoust.jpg'),
      description: 'На этом месте находилась деревянная церковь Святого Иоанна Златоуста, построенная в 1750-х годах.'
    },
    'Дом Правительства Свердловской области': {
      image: require('./assets/vopros.png'),
      description: 'В XVIII веке здесь находилось здание заводской конторы.'
    },
    'Торговые ряды': {
      image: require('./assets/vopros.png'),
      description: 'В XVIII веке здесь находился небольшой рынок.'
    },
    'Екатеринбургская плотина': {
      image: require('./assets/vopros.png'),
      description: 'Построена в 1723 году по указу Петра I. Первое гидротехническое сооружение на Урале, основа для работы металлургического завода.'
    },
    'Екатеринбургский завод': {
      image: require('./assets/vopros.png'),
      description: 'Первый металлургический завод города, основанный в 1723 году. Производил железо, чугун и пушки для русской армии.'
    },
    'Домики мастеровых': {
      image: require('./assets/vopros.png'),
      description: 'Первые жилые дома для рабочих завода, построенные в 1720-х годах. Деревянные избы с толстыми стенами для защиты от холода.'
    },
    'Городская управа': {
      image: require('./assets/vopros.png'),
      description: 'Городская управа была первым административным центром Екатеринбурга. Здесь принимались важные решения о развитии города.'
    },
    'Первая церковь': {
      image: require('./assets/vopros.png'),
      description: 'Первая церковь в Екатеринбурге была построена на пожертвования местных жителей. Она стала духовным центром города.'
    },
    'Первая школа': {
      image: require('./assets/18/school.png'),
      description: 'Первая школа Екатеринбурга была основана в 1724 году по распоряжению Вильгельма де Геннина при Екатеринбургском заводе.'
    }
  },
};

// Данные пользователя и достижений
const initialUserData = {
  name: "User",
  photo: require('./assets/user-photo.png'),
  stats: {
    eras: { completed: 0, total: 5 },
    locations: { visited: 0, total: 60 },
    quizzes: { passed: 0, total: 200 },
    achievements: { unlocked: 0, total: 30 }
  },
  achievements: [
    {
      id: 1,
      icon: require('./assets/medal.png'),
      title: "Первые шаги",
      description: "Посетите 5 исторических мест",
      unlocked: true
    },
    {
      id: 2,
      icon: require('./assets/quiz.png'),
      title: "Эрудит",
      description: "Пройдите 10 викторин",
      unlocked: true
    },
    {
      id: 3,
      icon: require('./assets/explorer.png'),
      title: "Исследователь",
      description: "Изучите 3 эпохи",
      unlocked: true
    },
    {
      id: 4,
      icon: require('./assets/history.png'),
      title: "Историк",
      description: "Пройдите все викторины по одной эпохе",
      unlocked: false
    },
    {
      id: 5,
      icon: require('./assets/crown.png'),
      title: "Коллекционер",
      description: "Соберите все достижения",
      unlocked: false
    },
    {
      id: 6,
      icon: require('./assets/century.png'),
      title: "Путешественник во времени",
      description: "Посетите все эпохи",
      unlocked: false
    },
    {
      id: 7,
      icon: require('./assets/landmark.png'),
      title: "Знаток города",
      description: "Изучите 20 достопримечательностей",
      unlocked: false
    },
    {
      id: 8,
      icon: require('./assets/book.png'),
      title: "Эксперт по истории",
      description: "Прочитайте все исторические справки",
      unlocked: false
    },
    {
      id: 9,
      icon: require('./assets/map.png'),
      title: "Картограф",
      description: "Посетите все места на карте",
      unlocked: false
    },
    {
      id: 10,
      icon: require('./assets/star.png'),
      title: "Звезда викторин",
      description: "Пройдите 50 викторин",
      unlocked: false
    }
  ]
};

// Данные викторины
const quizData = {
  '21 век': [
    {
      id: 1,
      question: 'В каком году был восстановлен Храм Большой Златоуст?',
      options: ['2006-2013', '1998-2005', '2010-2017'],
      correctAnswer: 0
    },
    {
      id: 2,
      question: 'Какова высота Храма-на-Крови?',
      options: ['45 метров', '60 метров', '75 метров'],
      correctAnswer: 1
    },
    {
      id: 3,
      question: 'Какие вузы объединились в Уральский Федеральный Университет?',
      options: ['УГТУ и УрГПУ', 'УГТУ-УПИ и УрГУ', 'УрФУ и УГМУ'],
      correctAnswer: 1
    },
    {
      id: 4,
      question: 'Сколько клавиш в Памятнике клавиатуре?',
      options: ['87', '104', '122'],
      correctAnswer: 1
    },
    {
      id: 5,
      question: 'Для чего используется Дом Н. И. Севастьянова после реставрации?',
      options: ['Музей', 'Резиденция Президента РФ на Урале', 'Гостиница'],
      correctAnswer: 1
    },
    {
      id: 6,
      question: 'Какова высота бизнес-центра "Высоцкий"?',
      options: ['156 метров', '188 метров', '210 метров'],
      correctAnswer: 1
    },
    {
      id: 7,
      question: 'В каком году был открыт Ельцин Центр?',
      options: ['2013', '2015', '2017'],
      correctAnswer: 1
    },
    {
      id: 8,
      question: 'Какой объект имеет раздвижную крышу?',
      options: ['Екатеринбург Арена', 'Бизнес-центр "Высоцкий"', 'Дом Правительства'],
      correctAnswer: 0
    },
    {
      id: 9,
      question: 'Какой парк связан с древними языческими обрядами?',
      options: ['Парк "Гора Крестов"', 'Парк Маяковского', 'Центральный парк'],
      correctAnswer: 0
    },
    {
      id: 10,
      question: 'Что включает в себя бизнес-центр "Высоцкий"?',
      options: ['Офисы, жилье и торговые площади', 'Только офисы', 'Только торговые площади'],
      correctAnswer: 0
    },
    {
      id: 11,
      question: 'Какой музей рассказывает о жизни первого президента России?',
      options: ['Ельцин Центр', 'Музей истории города', 'Музей современного искусства'],
      correctAnswer: 0
    },
    {
      id: 12,
      question: 'Какой стадион был построен к Чемпионату мира по футболу 2018 года?',
      options: ['Екатеринбург Арена', 'Центральный стадион', 'Лужники'],
      correctAnswer: 0
    }
  ],
  '20 век': [
    {
      id: 1,
      question: 'Как назывался Екатеринбург в советский период?',
      options: ['Свердловск', 'Ленинград-Уральский', 'Уралград'],
      correctAnswer: 0
    },
    {
      id: 2,
      question: 'В каком году был взорван оригинальный Храм Большой Златоуст?',
      options: ['1918', '1930', '1941'],
      correctAnswer: 1
    },
    {
      id: 3,
      question: 'Что находилось в Доме Н. И. Севастьянова в советское время?',
      options: ['Обком КПСС', 'Музей', 'Жилые квартиры'],
      correctAnswer: 0
    },
    {
      id: 4,
      question: 'Когда был снесен дом Ипатьева?',
      options: ['1950', '1977', '1985'],
      correctAnswer: 1
    },
    {
      id: 5,
      question: 'Какое учреждение было основано в 1920 году на месте УрФУ?',
      options: ['Уральский университет', 'Политехнический институт', 'Горный институт'],
      correctAnswer: 0
    },
    {
      id: 6,
      question: 'В каком году был открыт Екатеринбургский цирк?',
      options: ['1975', '1980', '1985'],
      correctAnswer: 1
    },
    {
      id: 7,
      question: 'Какой завод производил танки Т-34 во время ВОВ?',
      options: ['Уралмаш', 'Уралхиммаш', 'Уралэлектротяжмаш'],
      correctAnswer: 0
    },
    {
      id: 8,
      question: 'Какое здание стало символом советской власти в Екатеринбурге?',
      options: ['Дом Правительства Свердловской области', 'Дом Советов', 'Дом Красной Армии'],
      correctAnswer: 0
    },
    {
      id: 9,
      question: 'Какой стиль архитектуры характерен для Дома Правительства?',
      options: ['Конструктивизм', 'Классицизм', 'Барокко'],
      correctAnswer: 0
    },
    {
      id: 10,
      question: 'Какой вуз стал кузницей кадров для Урала?',
      options: ['Уральский политехнический институт', 'Уральский государственный университет', 'Уральский медицинский университет'],
      correctAnswer: 0
    },
    {
      id: 11,
      question: 'Какой завод сыграл ключевую роль в индустриализации страны?',
      options: ['Завод Уралмаш', 'Завод имени Кирова', 'Завод имени Ленина'],
      correctAnswer: 0
    },
    {
      id: 12,
      question: 'Какой объект был открыт в 1960 году на территории Парка имени В. В. Маяковского?',
      options: ['Малая Свердловская железная дорога', 'Планетарий', 'Летний театр'],
      correctAnswer: 0
    }
  ],
    '19 век': [
    {
      id: 1,
      question: 'Как называется знаменитый дом в стиле классицизма, символизирующий богатство купечества?',
      options: ['Дом Севастьянова', 'Дом Правительства', 'Дом Меценатов'],
      correctAnswer: 0
    },
    {
      id: 2,
      question: 'Когда был построен Дом Севастьянова?',
      options: ['1845 год', '1865 год', '1885 год'],
      correctAnswer: 1
    },
    {
      id: 3,
      question: 'Какой театр стал первым стационарным театром Екатеринбурга?',
      options: ['Театр оперы и балета', 'Драматический театр', 'Народный театр'],
      correctAnswer: 0
    },
    {
      id: 4,
      question: 'Сколько зрителей мог вместить Екатеринбургский театр оперы и балета до реконструкции?',
      options: ['500', '800', '1000'],
      correctAnswer: 1
    },
    {
      id: 5,
      question: 'Какое здание стало центром торговли в 19 веке?',
      options: ['Торговые ряды', 'Рынок', 'Базар'],
      correctAnswer: 0
    },
    {
      id: 6,
      question: 'Что располагалось в Торговых рядах?',
      options: ['Магазины и лавки', 'Администрация', 'Жилые помещения'],
      correctAnswer: 0
    },
    {
      id: 7,
      question: 'В каком стиле построен Дом Севастьянова?',
      options: ['Классицизм', 'Барокко', 'Готика'],
      correctAnswer: 0
    },
    {
      id: 8,
      question: 'Когда была основана первая школа в Екатеринбурге?',
      options: ['1724', '1750', '1801'],
      correctAnswer: 0
    },
    {
      id: 9,
      question: 'Где находилась первая школа Екатеринбурга?',
      options: ['При заводе', 'В центре города', 'У реки Исеть'],
      correctAnswer: 0
    },
    {
      id: 10,
      question: 'Чему обучали в первой школе города?',
      options: ['Грамоте, счету и основам ремесел', 'Только религии', 'Торговле'],
      correctAnswer: 0
    },
    {
      id: 11,
      question: 'Какие материалы использовались для строительства первых домиков мастеровых?',
      options: ['Кирпич', 'Дерево', 'Камень'],
      correctAnswer: 1
    },
    {
      id: 12,
      question: 'Какой парк стал популярным местом отдыха горожан в 19 веке?',
      options: ['Парк Маяковского', 'Центральный парк', 'Городской сад'],
      correctAnswer: 0
    }
  ],
  '18 век': [
    {
      id: 1,
      question: 'Какое гидротехническое сооружение стало основой для работы первого металлургического завода?',
      options: ['Дамба на реке Чусовая', 'Екатеринбургская плотина', 'Верх-Исетский пруд'],
      correctAnswer: 1
    },
    {
      id: 2,
      question: 'Когда был основан первый металлургический завод Екатеринбурга?',
      options: ['1703', '1723', '1750'],
      correctAnswer: 1
    },
    {
      id: 3,
      question: 'Какую роль выполняла Екатеринбургская плотина помимо обеспечения энергией завода?',
      options: ['Служила мостом', 'Была местом отдыха', 'Использовалась как торговая площадка'],
      correctAnswer: 0
    },
    {
      id: 4,
      question: 'Что производили на первом металлургическом заводе Екатеринбурга?',
      options: ['Ткани', 'Железо, чугун и пушки', 'Деревянные изделия'],
      correctAnswer: 1
    },
    {
      id: 5,
      question: 'Как назывались первые жилые дома для рабочих завода?',
      options: ['Домики мастеровых', 'Купеческие усадьбы', 'Крестьянские избы'],
      correctAnswer: 0
    },
    {
      id: 6,
      question: 'Какой толщины были стены домиков мастеровых для защиты от холода?',
      options: ['До 30 см', 'До 50 см', 'До 70 см'],
      correctAnswer: 1
    },
    {
      id: 7,
      question: 'Кто руководил строительством Екатеринбургского завода?',
      options: ['Вильгельм де Геннин', 'Василий Татищев', 'Петр I'],
      correctAnswer: 0
    },
    {
      id: 8,
      question: 'Как называлось первое административное здание города?',
      options: ['Городская управа', 'Дом губернатора', 'Здание думы'],
      correctAnswer: 0
    },
    {
      id: 9,
      question: 'Какая первая церковь была построена в Екатеринбурге?',
      options: ['Церковь с одним престолом и колокольней', 'Храм с тремя куполами', 'Монастырь'],
      correctAnswer: 0
    },
    {
      id: 10,
      question: 'Когда была основана первая школа в Екатеринбурге?',
      options: ['В начале 18 века', 'В 1730-е годы', 'В конце 18 века'],
      correctAnswer: 1
    },
    {
      id: 11,
      question: 'Где находилась первая школа Екатеринбурга?',
      options: ['При заводе', 'В центре города', 'У реки Исеть'],
      correctAnswer: 0
    },
    {
      id: 12,
      question: 'Чему обучали в первой школе города?',
      options: ['Грамоте, счету и основам ремесел', 'Только религии', 'Торговле'],
      correctAnswer: 0
    }
  ]
};




// Компонент элемента статистики
const StatItem = ({ value, label }) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

// Компонент достижения
const AchievementItem = ({ icon, title, description, unlocked }) => (
  <View style={[styles.achievementItem, !unlocked && styles.lockedAchievement]}>
    <Image
      source={icon}
      style={[styles.achievementIcon, !unlocked && { tintColor: '#aaa' }]}
    />
    <View style={styles.achievementText}>
      <Text style={[styles.achievementTitle, !unlocked && { color: '#aaa' }]}>{title}</Text>
      <Text style={[styles.achievementDescription, !unlocked && { color: '#ccc' }]}>{description}</Text>
    </View>
    {!unlocked && (
      <View style={styles.lockOverlay}>
        <Text style={styles.lockIcon}>🔒</Text>
      </View>
    )}
  </View>
);

// Компонент вопроса викторины
const QuizQuestion = ({ question, options, selectedAnswer, onAnswerSelect }) => {
  return (
    <View style={styles.quizQuestion}>
      <Text style={styles.quizQuestionText}>{question}</Text>
      <View style={styles.quizOptions}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.quizOption,
              selectedAnswer === index && styles.quizOptionSelected
            ]}
            onPress={() => onAnswerSelect(index)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.quizOptionText,
              selectedAnswer === index && styles.quizOptionTextSelected
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};



// Компонент результатов викторины
const QuizResults = ({ score, totalQuestions, onClose }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  let resultText = '';
  let resultColor = colors.primary;

  if (percentage >= 80) {
    resultText = 'Отличный результат!';
    resultColor = colors.success;
  } else if (percentage >= 50) {
    resultText = 'Хороший результат!';
    resultColor = colors.warning;
  } else {
    resultText = 'Попробуйте еще раз!';
    resultColor = colors.error;
  }

  return (
    <View style={styles.quizResults}>
      <Text style={styles.quizResultsTitle}>Результаты викторины</Text>
      <Text style={styles.quizResultsScore}>
        Вы ответили правильно на {score} из {totalQuestions} вопросов
      </Text>
      <View style={[styles.percentageCircle, { borderColor: resultColor }]}>
        <Text style={[styles.quizResultsPercentage, { color: resultColor }]}>
          {percentage}%
        </Text>
      </View>
      <Text style={[styles.resultText, { color: resultColor }]}>{resultText}</Text>
      <TouchableOpacity
        style={[styles.quizCloseButton, { backgroundColor: resultColor }]}
        onPress={onClose}
        activeOpacity={0.7}
      >
        <Text style={styles.quizCloseButtonText}>Закрыть</Text>
      </TouchableOpacity>
    </View>
  );
};

// Компонент панели авторизации
const AuthPanel = ({
  isLoginForm,
  authData,
  authError,
  onInputChange,
  onSubmit,
  onSwitchForm
}) => (
  <View style={styles.authContainerWrapper}>
    <Animated.View style={styles.authOverlay}>
      <View style={styles.authContainer}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.authLogo}
        />
        
        <Text style={styles.authTitle}>
          {isLoginForm ? 'Вход в аккаунт' : 'Регистрация'}
        </Text>
        
        {authError && (
          <View style={styles.authErrorContainer}>
            <Text style={styles.authErrorText}>{authError}</Text>
          </View>
        )}
        
        {!isLoginForm && (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Ваше имя</Text>
            <TextInput
              style={styles.authInput}
              placeholder="Введите ваше имя"
              value={authData.name}
              onChangeText={(text) => onInputChange('name', text)}
            />
          </View>
        )}
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.authInput}
            placeholder="Введите ваш email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={authData.email}
            onChangeText={(text) => onInputChange('email', text)}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Пароль</Text>
          <TextInput
            style={styles.authInput}
            placeholder="Введите пароль"
            secureTextEntry={true}
            value={authData.password}
            onChangeText={(text) => onInputChange('password', text)}
          />
        </View>
        
        <TouchableOpacity
          style={styles.authButton}
          onPress={onSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.authButtonText}>
            {isLoginForm ? 'Войти' : 'Зарегистрироваться'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.authSwitchButton}
          onPress={onSwitchForm}
          activeOpacity={0.6}
        >
          <Text style={styles.authSwitchText}>
            {isLoginForm
              ? 'Нет аккаунта? Зарегистрироваться'
              : 'Уже есть аккаунт? Войти'}
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  </View>
);

// Основной компонент приложения
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [authError, setAuthError] = useState('');
  const [userData, setUserData] = useState(initialUserData);
  const [showMarkerPanel, setShowMarkerPanel] = useState(false);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [showQuizPanel, setShowQuizPanel] = useState(false);
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedCentury, setSelectedCentury] = useState('21 век');
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizScore, setQuizScore] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const profileAnim = useRef(new Animated.Value(height)).current;
  const quizAnim = useRef(new Animated.Value(height)).current;
  const webViewRef = useRef(null);

  // Компонент карты
  const Map = () => {
    const webViewRef = useRef(null);
    return (
      <View style={{ flex: 1 }}>
        <WebView
          ref={webViewRef}
          source={require('./map.html')}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          geolocationEnabled={true}
          injectedJavaScript={`(function () {
            window.addEventListener('message', function(e) {
              console.log('Получено в HTML:', e.data);
              // Принудительно отправляем в React Native
              if (window.ReactNativeWebView && e.data) {
                window.ReactNativeWebView.postMessage(e.data);
              }
            });
          })();
          true;`}
          onMessage={(event) => {
            try {
              const message = JSON.parse(event.nativeEvent.data);
              if (message.name) {
                const decodedName = decodeURIComponent(message.name);
                handleMarkerPress(decodedName);
              }

            } catch (e) {
              console.error('Ошибка парсинга сообщения:', e);
            }
          }}
        />
      </View>
    );
  };

  // Обработчик нажатия на маркер
  const handleMarkerPress = (markerName) => {
    setSelectedMarker(markerName);
    setShowMarkerPanel(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Функции для обработки авторизации
  const handleAuthInputChange = (field, value) => {
    setAuthData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAuthSubmit = () => {
    // Простая валидация
    if (!authData.email || !authData.password || (!isLoginForm && !authData.name)) {
      setAuthError('Заполните все поля');
      return;
    }

    // Здесь должна быть реальная логика авторизации/регистрации
    // Для демонстрации просто закроем панель авторизации
    setIsAuthenticated(true);
    setAuthError('');
    
    // Обновим данные пользователя
    setUserData(prev => ({
      ...prev,
      name: authData.name || 'User'
    }));
  };

  const switchAuthForm = () => {
    setIsLoginForm(!isLoginForm);
    setAuthError('');
  };


  // Закрытие панели маркера
  const closeMarkerPanel = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowMarkerPanel(false));
  };

  // Переключение панели выбора века
  const toggleCenturyPanel = () => {
    if (showCenturyPanel) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setShowCenturyPanel(false));
    } else {
      setShowCenturyPanel(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };


  // Переключение панели профиля
  const toggleProfilePanel = () => {
    if (showProfilePanel) {
      Animated.timing(profileAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowProfilePanel(false));
    } else {
      setShowProfilePanel(true);
      Animated.timing(profileAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  // Открытие викторины
  const openQuiz = () => {
    if (!quizData[selectedCentury]) {
      Alert.alert('Ошибка', 'Нет данных викторины для выбранного века');
      return;
    }
    
    setUserAnswers(Array(quizData[selectedCentury].length).fill(null));
    setShowQuizPanel(true);
    Animated.timing(quizAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Закрытие викторины
  const closeQuiz = () => {
    Animated.timing(quizAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowQuizPanel(false);
      setShowQuizResults(false);
    });
  };

  // Обработчик выбора ответа
  const handleAnswerSelect = (questionIndex, answerIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  // Завершение викторины
  const finishQuiz = () => {
    Alert.alert(
      'Завершить попытку',
      'Вы точно хотите закончить попытку?',
      [
        {
          text: 'Нет',
          style: 'cancel'
        },
        {
          text: 'Да',
          onPress: () => {
            // Подсчет правильных ответов
            let score = 0;
            quizData[selectedCentury].forEach((question, index) => {
              if (userAnswers[index] === question.correctAnswer) {
                score++;
              }
            });
            setQuizScore(score);
            setShowQuizResults(true);
            
            // Обновляем статистику пользователя
            setUserData(prev => ({
              ...prev,
              stats: {
                ...prev.stats,
                quizzes: {
                  ...prev.stats.quizzes,
                  passed: prev.stats.quizzes.passed + 1
                }
              }
            }));
          }
        }
      ]
    );
  };

  // Получение данных для текущего маркера
  const getMarkerData = () => {
    if (!selectedMarker || !markersData[selectedCentury] || !markersData[selectedCentury][selectedMarker]) {
      return {
        image: require('./assets/vopros.png'),
        description: 'Извините, но информация недоступна. Скорее всего данной постройки не существовало в выбранную эпоху'
      };
    }
    return markersData[selectedCentury][selectedMarker];
  };

  const markerData = getMarkerData();

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.authContainerWrapper}>
        <AuthPanel
          isLoginForm={isLoginForm}
          authData={authData}
          authError={authError}
          onInputChange={handleAuthInputChange}
          onSubmit={handleAuthSubmit}
          onSwitchForm={switchAuthForm}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <Map onMarkerPress={handleMarkerPress} selectedCentury={selectedCentury} />
      </View>

      {/* Панель информации о маркере */}
      {showMarkerPanel && (
        <Animated.View
          style={[
            styles.markerPanel,
            {
              transform: [{
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [300, 0]
                })
              }]
            }
          ]}
        >
          <TouchableOpacity
            style={styles.closeMarkerButton}
            onPress={closeMarkerPanel}
          >
            <Text style={styles.closeMarkerIcon}>×</Text>
          </TouchableOpacity>
        
          <ScrollView
            contentContainerStyle={styles.markerScrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Image
              source={markerData.image}
              style={styles.markerImage}
              resizeMode="cover"
            />
            <View style={styles.markerInfo}>
              <Text style={styles.markerTitle}>{selectedMarker}</Text>
              <View style={styles.centuryBadge}>
                <Text style={styles.centuryBadgeText}>{selectedCentury}</Text>
              </View>
              <Text style={styles.markerDescription}>{markerData.description}</Text>
            
              {/* Навигация между маркерами */}
              <View style={styles.markerNavigation}>
                <TouchableOpacity
                  style={styles.navArrow}
                  onPress={() => {
                    const centuries = ['18 век', '19 век', '20 век', '21 век'];
                    const currentIndex = centuries.indexOf(selectedCentury);
                    const prevIndex = (currentIndex - 1 + centuries.length) % centuries.length;
                    setSelectedCentury(centuries[prevIndex]);
                  }}
                >
                  <Text style={styles.navArrowText}>←</Text>
                </TouchableOpacity>
              
                <Text style={styles.markerCounter}>
                  {selectedCentury}
                </Text>
              
                <TouchableOpacity
                  style={styles.navArrow}
                  onPress={() => {
                    const centuries = ['18 век', '19 век', '20 век', '21 век'];
                    const currentIndex = centuries.indexOf(selectedCentury);
                    const nextIndex = (currentIndex + 1) % centuries.length;
                    setSelectedCentury(centuries[nextIndex]);
                  }}
                >
                  <Text style={styles.navArrowText}>→</Text>
                </TouchableOpacity>
              </View>

              {/* Кнопка начала викторины */}
              {quizData[selectedCentury] && (
                <TouchableOpacity
                  style={styles.quizButton}
                  onPress={openQuiz}
                >
                  <Text style={styles.quizButtonText}>Начать викторину</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </Animated.View>
      )}

      {/* Панель профиля */}
      {showProfilePanel && (
        <Animated.View
          style={[
            styles.profilePanel,
            { transform: [{ translateY: profileAnim }] }
          ]}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={toggleProfilePanel}
          >
            <Text style={styles.closeIcon}>×</Text>
          </TouchableOpacity>
        
          <ScrollView
            contentContainerStyle={styles.profileContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.userHeader}>
              <Image
                source={userData.photo}
                style={styles.userPhoto}
              />
              <Text style={styles.userName}>{userData.name}</Text>
            </View>
            
            <View style={styles.statsGrid}>
              <StatItem
                value={`${userData.stats.eras.completed}/${userData.stats.eras.total}`}
                label="Изученные эпохи"
              />
              <StatItem
                value={`${userData.stats.locations.visited}/${userData.stats.locations.total}`}
                label="Посещено точек"
              />
              <StatItem
                value={`${userData.stats.quizzes.passed}/${userData.stats.quizzes.total}`}
                label="Пройдено викторин"
              />
              <StatItem
                value={`${userData.stats.achievements.unlocked}/${userData.stats.achievements.total}`}
                label="Ваши достижения"
              />
            </View>
            
            <View style={styles.achievementsSection}>
              <Text style={styles.sectionTitle}>Достижения</Text>
              
              {userData.achievements.map(achievement => (
                <AchievementItem
                  key={achievement.id}
                  icon={achievement.icon}
                  title={achievement.title}
                  description={achievement.description}
                  unlocked={achievement.unlocked}
                />
              ))}
            </View>
          </ScrollView>
        </Animated.View>
      )}

      {/* Панель викторины */}
      {showQuizPanel && (
        <Animated.View
          style={[
            styles.quizPanel,
            { transform: [{ translateY: quizAnim }] }
          ]}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeQuiz}
          >
            <Text style={styles.closeIcon}>×</Text>
          </TouchableOpacity>
          {!showQuizResults ? (
            <ScrollView
              contentContainerStyle={styles.quizContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.quizTitle}>Викторина: {selectedCentury}</Text>
              
              {quizData[selectedCentury]?.map((question, index) => (
                <QuizQuestion
                  key={question.id}
                  question={question.question}
                  options={question.options}
                  selectedAnswer={userAnswers[index]}
                  onAnswerSelect={(answerIndex) => handleAnswerSelect(index, answerIndex)}
                />
              ))}
              <TouchableOpacity
                style={styles.finishQuizButton}
                onPress={finishQuiz}
              >
                <Text style={styles.finishQuizButtonText}>Закончить попытку</Text>
              </TouchableOpacity>
            </ScrollView>
          ) : (
            <QuizResults
              score={quizScore}
              totalQuestions={quizData[selectedCentury]?.length || 0}
              onClose={closeQuiz}
            />
          )}
        </Animated.View>
      )}

      {/* Нижняя навигационная панель */}
      <View style={styles.bottomNavBar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            setShowProfilePanel(false);
            setShowMarkerPanel(false);
          }}
        >
          <Image
            source={require('./assets/home-icon.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navButtonText}>Главная</Text>
        </TouchableOpacity>
      
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            setShowProfilePanel(false);
            setShowMarkerPanel(false);
          }}
        >
          <Image
            source={require('./assets/map-icon.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navButtonText}>Карта</Text>
        </TouchableOpacity>
      
        <TouchableOpacity
          style={styles.navButton}
          onPress={toggleProfilePanel}
        >
          <Image
            source={require('./assets/user-photo.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navButtonText}>Профиль</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

// Стили компонентов
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    backgroundColor: colors.cardBackground,
    borderTopWidth: 1,
    borderColor: colors.divider,
    paddingHorizontal: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  activeNavButton: {
    borderTopWidth: 2,
    borderColor: colors.primary,
  },
  navIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginBottom: 4,
    tintColor: colors.textSecondary,
  },
  activeNavIcon: {
    tintColor: colors.primary,
  },
  navButtonText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  activeNavButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
  markerPanel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 70,
    height: height * 0.5,
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    zIndex: 20,
  },
  markerScrollContent: {
    paddingBottom: 20,
  },
  markerImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  markerInfo: {
    padding: 20,
  },
  markerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text,
  },
  centuryBadge: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 15,
  },
  centuryBadgeText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  markerDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  markerNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  navArrow: {
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navArrowText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  markerCounter: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  closeMarkerButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 30,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeMarkerIcon: {
    fontSize: 20,
    color: colors.white,
    lineHeight: 20,
  },
  profilePanel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 70,
    backgroundColor: colors.white,
    zIndex: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    elevation: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  profileContent: {
    padding: 20,
    paddingTop: 50,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 40,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 25,
    color: colors.gray,
    lineHeight: 25,
  },
  userHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  userPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.primary,
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statItem: {
    width: '48%',
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
    marginLeft: 5,
  },
  achievementsSection: {
    marginBottom: 20,
  },
  achievementItem: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  lockedAchievement: {
    opacity: 0.7,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  achievementText: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 3,
  },
  achievementDescription: {
    fontSize: 14,
    color: colors.gray,
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: {
    fontSize: 24,
    color: colors.gray,
  },
  quizPanel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 70,
    backgroundColor: colors.white,
    zIndex: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    elevation: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  quizContent: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  quizTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 25,
    textAlign: 'center',
  },
  quizQuestion: {
    marginBottom: 25,
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 16,
  },
  quizQuestionText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 15,
  },
  quizOptions: {
    marginTop: 10,
  },
  quizOption: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  quizOptionSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: colors.primary,
  },
  quizOptionText: {
    fontSize: 16,
    color: colors.text,
  },
  quizOptionTextSelected: {
    color: colors.primaryDark,
    fontWeight: '600',
  },
  finishQuizButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  finishQuizButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  quizResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  quizResultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  quizResultsScore: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 26,
  },
  percentageCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  quizResultsPercentage: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 30,
  },
  quizCloseButton: {
    borderRadius: 12,
    paddingHorizontal: 40,
    paddingVertical: 15,
  },
  quizCloseButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  quizButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
  },
  quizButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  authContainerWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  authOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.95)',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '85%',
    maxWidth: 400,
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  authLogo: {
    width: 120,
    height: 120,
    marginBottom: 25,
    resizeMode: 'contain',
  },
  authTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
    marginLeft: 5,
  },
  authInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  authButton: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  authButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  authSwitchButton: {
    marginTop: 20,
  },
  authSwitchText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  authErrorContainer: {
    width: '100%',
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  authErrorText: {
    color: colors.error,
    textAlign: 'center',
    fontSize: 14,
  },
});