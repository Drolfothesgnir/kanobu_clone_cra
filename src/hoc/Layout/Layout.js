import React from 'react';
import Transition from 'react-transition-group/Transition';

import { UIConsumer } from '../../Context/UIContext';
import Header from '../../containers/Header/Header';
import Footer from '../../components/Footer/Footer';

const Auth = React.lazy(() => import('../../containers/AuthModal/AuthModal'));
const Search = React.lazy(() => import('../../containers/Search/Search'));

const Layout = (props) => {
    console.log('[Layout] render');
    
    return (
        <>
            <Header/>
            <main>
                {props.children}
            </main>
            <Footer/>
            <UIConsumer>
                {({
                  authActive,
                  searchActive,
                  Shouts,
                  shoutsActive,
                  onDisable,
                  onEnable
                }) => (
                    <>
                      <React.Suspense fallback={null}>
                        {authActive ? (
                            <Auth close={()=>onDisable('authActive')}/>
                            ) : null}
                        {searchActive ? (
                          <Search close={()=>onDisable('searchActive')}/>
                        ) : null}
                      </React.Suspense>
                      <Transition
                        timeout={500}
                        mountOnEnter
                        unmountOnExit
                        in={shoutsActive && Shouts !== null}>
                        {state => <Shouts 
                            mode={state === 'entering' ? 'Shouts-open' :
                                state === 'exiting' ? 'Shouts-close' : null}
                            login={() => onEnable('authActive')}
                            close={() => onDisable('shoutsActive')}
                            readyToLoad={state==='entered'}/>}
                    </Transition>
                    </>
                )}
            </UIConsumer>
        </>
    );
};

export default Layout;