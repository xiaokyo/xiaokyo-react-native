import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import {debounce} from '~/src/utils';
// components
import Header from '~/src/components/header';
import Card from './components/card';
import Loading from '~/src/components/loading';

// styled
import {Wrapper, FooterLoading, FooterLoadMore} from './styled';

const GET_POSTS = gql`
  query GetPosts($limit: Int, $skip: Int) {
    getPosts(limit: $limit, skip: $skip) {
      _id
      description
      title
      like_count
      comment_count
      createDate
      user {
        _id
        username
      }
    }
  }
`;

export default props => {
  const [params, setParams] = useState({limit: 10, skip: 0});
  const {loading, error, data, refetch, fetchMore} = useQuery(GET_POSTS, {
    variables: {...params},
  });
  const {refreshing, onReFresh, onEndReached} = useFetchPost({
    params,
    setParams,
    refetch,
    fetchMore,
  });

  // if (loading) return <Loading />;
  if (error) {
    return <Loading />;
  }

  return (
    <>
      <Header title="发现" />
      <Wrapper>
        <FlatList
          horizontal={false}
          data={(data && data.getPosts) || []}
          renderItem={({item}) => <Card item={item} />}
          keyExtractor={item => item._id}
          refreshing={refreshing}
          onRefresh={onReFresh}
          onEndReached={debounce(onEndReached, 1000, true)}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => <FooterComponent loading={loading} />}
        />
      </Wrapper>
    </>
  );
};

let page = 0;
const useFetchPost = ({params, setParams, refetch, fetchMore}) => {
  const [refreshing, setRefreshing] = useState(false);
  // const [loadMore, setLoadMore] = useState(true)

  const onReFresh = async () => {
    page = 0;
    setParams({limit: 10, skip: 0});
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const onEndReached = async () => {
    page += 1;
    await fetchMore({
      variables: {
        skip: page,
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult) {
          return prev;
        }
        if (!prev) {
          return prev || [];
        }
        return {
          ...prev,
          getPosts: [...prev.getPosts, ...fetchMoreResult.getPosts],
        };
      },
    });
  };

  return {refreshing, onReFresh, onEndReached};
};

const FooterComponent = ({loading = false, loadMore = true}) => {
  return (
    <FooterLoading>
      {loading ? (
        <Loading />
      ) : (
        <FooterLoadMore>
          {loadMore ? '上拉加载更多~汪' : '已经没有了哦~汪'}
        </FooterLoadMore>
      )}
    </FooterLoading>
  );
};
