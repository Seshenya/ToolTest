const config = {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'rootuser',
    database: 'artsync',
    clientUrl: ['http://localhost:5173/', 'http://localhost:3000'],
    ACCESS_TOKEN_SECRET:
        'd506fdbfbb5c9e2f74bec31cfa0dff7e38a01736b585e1f2f1e8ac6a9cdbac0f252fef88b5f907f3452d31565329c1c7ad9e02409700bd59ed96947a008c4b7c',
    REFRESH_TOKEN_SECRET:
        '6a7b2e4070e23fbb71bd40e5417b4eaf05ca853810a9fc4d58e8c26a4447dde5705325f4f8594ae7e210fb210883c035644e2e90df68b9a752fd774cf42c94b0',
    ACCESS_TOKEN_EXPIRE: '3600s',
    REFRESH_TOKEN_EXPIRE: '5h',
}

export default config
