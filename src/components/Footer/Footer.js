import React from 'react';
import { Link } from 'react-router-dom';
import { faFacebookF , faTwitter , faVk , faYoutube} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './Footer.module.css';

class Footer extends React.Component {
    shouldComponentUpdate(){return false};
    render(){
        return (
            <footer>
                <div className={classes.Container}>
                    <div className={classes.Links}>
                        <ul>
                            <li><Link to='/about'>Agreement</Link></li>
                            <li><Link to='/about'>Contacts</Link></li>
                            <li><Link to='/about'>Adverstisment</Link></li>
                            <li><Link to='/about'>Community rules</Link></li>
                        </ul>
                    </div>
                    <div className={classes.Counter}>
                        <div>
                            18+
                        </div>
                        <a 
                            rel='noopener noreferrer'
                            href='https://www.liveinternet.ru/?Kanobu_Network' 
                            target='_blank'>
                            <div className={classes.CounterLink}>
                                <span></span>
                            </div>
                        </a>
                    </div>
                    <div className={classes.Bottom}>
                        <a 
                            href="https://www.facebook.com/Kanobu" 
                            target="_blank" 
                            rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebookF}/>
                        </a>
                        <a 
                            href="https://www.twitter.com/kanobu_ru" 
                            target="_blank" 
                            rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter}/>
                        </a>
                        <span>
                            © 2008—2018 Kanobu network<br/>
                            <b>Design by STEREOVARIO</b>
                        </span>
                        <a 
                            href="https://vk.com/kanobu" 
                            target="_blank" 
                            rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faVk}/>
                        </a>
                        <a 
                            href="https://www.youtube.com/user/KanobuOfficial" 
                            target="_blank" 
                            rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faYoutube}/>
                        </a>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;