import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';

fetch('https://lambda-bots.com/artem')
    .then((response) => {
        response.json()
            .then((data) => {
                data.forEach((dialog, i) => {
                    if (i !== 5) return;

                    console.log(dialog);

                    let root = document.createElement('div');
                    document.body.appendChild(root);

                    ReactDOM.render(
                        <App
                            data={dialog}
                        />
                        , root
                    );
                });
            });
    });
