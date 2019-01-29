import React from 'react';
import Transition from 'react-transition-group/Transition';

import { UIConsumer } from '../../Context/UIContext';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const ProfileEditor = React.lazy(() => import('../../containers/ProfileEditor/ProfileEditor'))
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
                  profileEditorActive,
                  onDisable,
                  onEnable
                }) => (
                    <>
                      <React.Suspense fallback={null}>
                        {authActive && (
                            <Auth close={()=>onDisable('authActive')}/>
                            )}
                        {searchActive && (
                          <Search close={()=>onDisable('searchActive')}/>
                        )}
                        {profileEditorActive && (
                            <ProfileEditor close={()=>onDisable('profileEditorActive')}/>
                        )}
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