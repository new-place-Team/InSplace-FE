/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Container, Grid, Text } from '../elements';
import SearchBar from '../components/SearchBar';
import SelectedCategory from '../components/SelectedCategory';
import ListCard from '../components/ListCard';
import Header from '../components/Header';

const SearchList = props => {
  const data = {
    type: 'all',
    list: [
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
    ],
  };
  const tag = [{ tag: '두명' }, { tag: '혼성' }, { tag: '카페' }];
  // 전체 검색 결과이면 true 아니면 false
  const type = data.type === 'all';

  return (
    <>
      <Container>
        <Header _back _content="검색결과" _type="search" />
        <SearchBar />
        {!type && <SelectedCategory tag={tag} />}
        <Grid margin="24px 0">
          <Text fontSize="20px" bold>
            {type ? '전체' : '실내'}
          </Text>
        </Grid>
        <Grid justify="space-between" wrap>
          {data.list.map(item => {
            return <ListCard type="search" {...item} />;
          })}
        </Grid>
      </Container>
    </>
  );
};

export default SearchList;
