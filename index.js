const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const fetch = ('fetch-node')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000.");
})
/**
 * @swagger
 * /worklog:
 *   post:
 *     tags:
 *       - Work Log
 *     description: Registra work log no Jira
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         description: Token de acesso ao Jira
 *         required: true
 *         type: string
 *       - name: taskid
 *         in: header
 *         description: ID da tarefa no Jira
 *         required: true
 *         type: string
 *       - name: body
 *         in: body
 *         description: Informações do work log
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             timeSpentSeconds:
 *               type: integer
 *               example: 3600
 *             comment:
 *               type: string
 *               example: Trabalhei por uma hora na tarefa X
 *     responses:
 *       200:
 *         description: Work log registrado com sucesso
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Work log registrado com sucesso!
 */

app.post('/worklog', (req, res) => {
    const jiraToken = req.headers.authorization;
    const jiraTaskId = req.headers.taskid;

    const worklog = {
        timeSpentSeconds: req.body.timeSpentSeconds,
        comment: req.body.comment
    };
    const options = {
        method: 'POST',
        url: `https://mytasks.atlassian.net/rest/api/3/issue/${jiraTaskId}/worklog`,
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jiraToken}`,
        },
        body: JSON.stringify(worklog)
    };
    request(options, (error, response, body) => {
        if (error) {
            throw new Error(error)
        }else{
            res.send("Worklog registrado com sucesso!")
        }
        
    })
})

app.get('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
})

