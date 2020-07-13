const fs = require('fs');
const got = require('got');
const express = require("express");
const request = require("request");
const cheerio = require('cheerio');

var app = express();

app.use(express.static(__dirname+ '/Website Parser'))

var port = 3000;

app.listen(port);

console.log('server on '+__dirname);


request.get('https://secure.irusa.org/donate/donate-now',
  function(error, response,body){
          if(!error && response.statusCode==200){
            app.get('/get',function(req,res)
            {
              const $ = cheerio.load(body);
              var jsonObj=[];
              var n=0;
              for(n=0;n<6;n++)
              {
                var i=1;
                var nt=9186+(n*3);
                for(i=1;i<($('option','#funds-select-'+String(nt)).length);i++)
                {
                  var fund={
                    country:$('.designation-group-title')[4+n].children[0].children[0].data,
                    section:$('option','#funds-select-'+String(nt))[i].children[0].data
                  }
                  jsonObj.push(fund);
                  //console.log($('option','#funds-select-'+String(nt))[i].children[0].data+"\n");

                }
              }
              //console.log($('.designation-group-title')[10].children[0].children[0].data);
              for(i=1;i<($('option','#funds-select-9168').length);i++)
              {
                var fund={
                  country:$('.designation-group-title')[10].children[0].children[0].data,
                  section:$('option','#funds-select-9168')[i].children[0].data
                }
                jsonObj.push(fund);
                //console.log($('option','#funds-select-9168')[i].children[0].data+"\n");
              }
              //console.log($('.designation-group-title')[11].children[0].children[0].data);
              for(i=1;i<($('option','#funds-select-9165').length);i++)
              {
                var fund={
                  country:$('.designation-group-title')[11].children[0].children[0].data,
                  section:$('option','#funds-select-9165')[i].children[0].data
                }
                jsonObj.push(fund);
                //console.log($('option','#funds-select-9165')[i].children[0].data+"\n");
              }
              //console.log($('.designation-group-title')[12].children[0].children[0].data);
              for(i=1;i<($('option','#funds-select-9180').length);i++)
              {
                var fund={
                  country:$('.designation-group-title')[12].children[0].children[0].data,
                  section:$('option','#funds-select-9180')[i].children[0].data
                }
                jsonObj.push(fund);
                //console.log($('option','#funds-select-9180')[i].children[0].data+"\n");
              }
              //console.log($('.designation-group-title')[13].children[0].children[0].data);
              for(i=1;i<($('option','#funds-select-9183').length);i++)
              {
                var fund={
                  country:$('.designation-group-title')[13].children[0].children[0].data,
                  section:$('option','#funds-select-9183')[i].children[0].data
                }
                jsonObj.push(fund);
                //console.log($('option','#funds-select-9183')[i].children[0].data+"\n");
              }
              //console.log($('.designation-group-title')[14].children[0].children[0].data);
              for(i=1;i<($('option','#funds-select-9171').length);i++)
              {
                var fund={
                  country:$('.designation-group-title')[14].children[0].children[0].data,
                  section:$('option','#funds-select-9171')[i].children[0].data
                }
                jsonObj.push(fund);
                //console.log($('option','#funds-select-9171')[i].children[0].data+"\n");
              }
              //console.log($('.designation-group-title')[15].children[0].children[0].data);
              for(i=1;i<($('option','#funds-select-9174').length);i++)
              {
                var fund={
                  country:$('.designation-group-title')[15].children[0].children[0].data,
                  section:$('option','#funds-select-9174')[i].children[0].data
                }
                jsonObj.push(fund);
                //console.log($('option','#funds-select-9174')[i].children[0].data+"\n");
              }
              //console.log($('.designation-group-title')[16].children[0].children[0].data);
              for(i=1;i<($('option','#funds-select-9177').length);i++)
              {
                var fund={
                  country:$('.designation-group-title')[16].children[0].children[0].data,
                  section:$('option','#funds-select-9174')[i].children[0].data
                }
                jsonObj.push(fund);
                //console.log($('option','#funds-select-9177')[i].children[0].data+"\n");
              }
              var newBody="<h1>List of Donaters</h1>";
              if(typeof req.query.country=="undefined")
              {
                var g=0;
                for(g=0;g<jsonObj.length;g++)
                {
                  newBody+="<h3>"+jsonObj[g].country+"</h3>";
                  newBody+="<p>"+jsonObj[g].section+"</p>";
                }
              }
              else {
                var g=0;
                newBody+="<h3>"+req.query.country.toUpperCase()+"</h3>";
                for(g=0;g<jsonObj.length;g++)
                {
                  if(jsonObj[g].section.toUpperCase().includes(req.query.country.toUpperCase()))
                  {
                    newBody+="<p>"+jsonObj[g].section+": "+jsonObj[g].country+"</p>";
                  }

                }
              }

              res.send(newBody);
            });
          }

        }
);
