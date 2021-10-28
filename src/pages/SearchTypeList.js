/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Container } from '../elements';
import SearchBar from '../components/SearchBar';
import SelectedCategory from '../components/SelectedCategory';
import { Slick } from '../components/Slick';
import ListCard from '../components/ListCard';
import ContentsTitle from '../components/ContentsTitle';

const SearchTypeList = () => {
  const tag = [{ tag: '두명' }, { tag: '혼성' }, { tag: '카페' }];
  const srcList = [
    { src: 'https://t1.daumcdn.net/cfile/tistory/213C9A345225669622' },
    { src: 'https://img.siksinhot.com/article/1613970568705496.jpg' },
    {
      src: 'https://mblogthumb-phinf.pstatic.net/MjAxOTA4MjZfMjk5/MDAxNTY2Nzg2MzQzMTE2.Gf-bdbf4G8JpcXijSij4ydO7dKhCpeTUCISRwXDMI90g.Yeoe2X4MKjwyFStB4Vqm2FkTmlLEnx77Sihzs97-reog.JPEG.flourish12/output_2154676882.jpg?type=w800',
    },
    { src: 'https://cdn.st-news.co.kr/news/photo/202105/2097_3508_4043.jpg' },
    {
      src: 'https://www.artinsight.co.kr/data/tmp/2102/20210224004559_fnyxevid.jpg',
    },
    {
      src: 'https://img1.daumcdn.net/thumb/R720x0/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fdailylife%2Fd069f8ac17de4c7c91c0dc056d452779.jpg',
    },
    {
      src: 'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/2UUt/image/Prcj7-b1i0zgV78lpTYYBdP4GRw.jpg',
    },
    {
      src: 'https://img.wkorea.com/w/2021/02/style_602cfee44c823-970x1200.jpg',
    },
  ];
  return (
    <>
      <Container>
        <SearchBar />
        <SelectedCategory tag={tag} />
        <ContentsTitle title="실내" />
        <Slick>
          {srcList.map(item => {
            return <ListCard {...item} />;
          })}
        </Slick>
        <ContentsTitle title="실외에서 시원한 바람과 함께" />
        <Slick>
          {srcList.map(item => {
            return <ListCard {...item} />;
          })}
        </Slick>
      </Container>
    </>
  );
};

export default SearchTypeList;
