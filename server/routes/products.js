import HTTPStatus from 'http-status';
import fetch from 'node-fetch';
import _ from 'lodash';

const products = (options) => {

    const parsingStatusData = async (req) => {
        /*
        try {
            const snapshot = await rawSources(options.servers);
            const parsed = await parsedSources(options.metadata.db, req.params.id, req.params.version)
                .then(sources => sources.filter(goodSource => snapshot.includes(parseInt(goodSource, 10))));
            const operators = await operatorsData(options.servers);
            const rawDataSnapshot = await rawData(options.servers)
                .then(raw => raw.map((source) => {
                    if (parsed.includes(source.sourceId)) {
                        source.processed = true;
                    } else {
                        source.processed = false;
                    }
                    return source;
                }))
                .then(raw => raw.map((source) => {
                    const operatorIndex = operators.findIndex(operator => operator.cord_id === source.cordId);
                    if (operatorIndex !== -1) {
                        source.operator_name = operators[operatorIndex].operator_name;
                    } else {
                        source.operator_name = 'unknown';
                    }
                    return source;
                }));
            return {
                status: 'ok',
                data: {
                    parsed: parsed.length,
                    all: snapshot.map(operator => operator.sourcesId.length).reduce((total, num) => total + num ), // eslint-disable-line
                    snapshotData: snapshot,
                    rawData: rawDataSnapshot
                }
            };
        } catch (e) {
            return {
                status: 'failure',
                msg: `${e}`
            };
        }
        */
    };

    const getProducts = async (req, res) => {
        try {
            // const result = await parsingStatusData(req);
            const data = [
                {
                    productid: 1,
                    categoryid: 1,
                    shopid: 1,
                    name: 'chleb',
                    description: 'taki sobie chleb xDDD',
                    price: 21.37,
                    currency: 'szekle',
                    link: 'www.pornhub.com'
                },
                {
                    productid: 2,
                    categoryid: 2,
                    shopid: 2,
                    name: 'mleko',
                    description: 'takie sobie mleko',
                    price: 21.37,
                    currency: 'pomarancze',
                    link: 'www.pornhub.com'
                }
            ];
            // const resultData = Object.assign({}, data);
            return res.status(HTTPStatus.OK).json(data);
        } catch (e) {
            return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(`Error: ${e}`);
        }
    };
    return (req, res) => {
        getProducts(req, res);
    };
};

export default products;
