(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{c3jy:function(l,n,u){"use strict";u.r(n);var t=u("CcnG"),e=function(){},o=u("pMnS"),i=function(){function l(l,n){this.changeDetectorRef=l,this.ngZone=n}return l.prototype.transform=function(l){var n=this;this.removeTimer();var u=new Date(l),t=new Date,e=Math.round(Math.abs((t.getTime()-u.getTime())/1e3)),o=Number.isNaN(e)?1e3:1e3*this.getSecondsUntilUpdate(e);this.timer=this.ngZone.runOutsideAngular(function(){return"undefined"!=typeof window?window.setTimeout(function(){n.ngZone.run(function(){return n.changeDetectorRef.markForCheck()})},o):null});var i=Math.round(Math.abs(e/60)),a=Math.round(Math.abs(i/60)),r=Math.round(Math.abs(a/24)),s=Math.round(Math.abs(r/30.416)),d=Math.round(Math.abs(r/365));return Number.isNaN(e)?"":e<=45?"a few seconds ago":e<=90?"a minute ago":i<=45?i+" minutes ago":i<=90?"an hour ago":a<=22?a+" hours ago":a<=36?"a day ago":r<=25?r+" days ago":r<=45?"a month ago":r<=345?s+" months ago":r<=545?"a year ago":d+" years ago"},l.prototype.ngOnDestroy=function(){this.removeTimer()},l.prototype.removeTimer=function(){this.timer&&(window.clearTimeout(this.timer),this.timer=null)},l.prototype.getSecondsUntilUpdate=function(l){return l<60?2:l<3600?30:l<86400?300:3600},l}(),a=u("Ip0R"),r=u("EnSQ"),s=u("LV99"),d=u("AytR"),c=function(){function l(l,n){var u=this;this.data=l,this.route=n,this.columns=[],this.graph=!1,this.first=100,this.last=null,this.after=null,this.before=null,this.limit=100,n.params.subscribe(function(l){u.data.getInfoqueryById("infoteam",u.route.snapshot.paramMap.get("slug"),d.a.organization).subscribe(function(l){u.repositories=l.organization.team.repositories.edges,u.members=l.organization.team.members.edges}),u.before=null,u.after=null,u.last=null,u.first=100,u.columns=[],u.graph=!1})}return l.prototype.ngOnInit=function(){},l.prototype.getGrahp=function(l){var n=this;this.repo=l,this.graph=!0;var u=!0;this.columns.forEach(function(n){n[0]==l&&(u=!1)}),u&&((this.before||this.after)&&this.clear(),this.data.getGraph("getGraph",l,this.first,this.last,this.after,this.before,d.a.organization).subscribe(function(u){if(null!=u.repository.ref){var t=[];t.push(l),n.pageInfo=u.repository.ref.target.history.pageInfo,u.repository.ref.target.history.edges.forEach(function(l){t.push(l.node.additions)}),t.sort(function(l,n){return parseFloat(String(n))-parseFloat(String(l))}),n.columns.push(t),s.generate({bindto:"#chart",data:{columns:n.columns}})}}))},l.prototype.previous=function(l){this.before=this.pageInfo.startCursor,this.after=null,this.last=this.limit,this.first=null,this.loadGraph(l)},l.prototype.next=function(l){this.after=this.pageInfo.endCursor,this.before=null,this.last=null,this.first=this.limit,this.loadGraph(l)},l.prototype.loadGraph=function(l){var n=this;this.data.getGraph("getGraph",l,this.first,this.last,this.before,this.after,d.a.organization).subscribe(function(u){var t=[];n.columns=[],t.push(l),n.pageInfo=u.repository.ref.target.history.pageInfo,u.repository.ref.target.history.edges.forEach(function(l){t.push(l.node.additions)}),t.sort(function(l,n){return parseFloat(String(n))-parseFloat(String(l))}),n.columns.push(t),s.generate({bindto:"#chart",data:{columns:n.columns}})})},l.prototype.clear=function(){this.before=null,this.after=null,this.last=null,this.first=100,this.columns=[],s.generate({bindto:"#chart",data:{columns:this.columns}})},l}(),p=u("ZYCi"),m=t["\u0275crt"]({encapsulation:2,styles:[],data:{}});function f(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"span",[["class","badge badge-pill"]],[[4,"background-color",null],[4,"margin-right",null]],null,null,null,null)),(l()(),t["\u0275ted"](1,null,["",""]))],null,function(l,n){l(n,0,0,n.context.$implicit.node.color,"5px"),l(n,1,0,n.context.$implicit.node.name)})}function h(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,13,"div",[["class","col-sm-6 col-md-4"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,12,"div",[["class","card border-primary"]],null,null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,6,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),t["\u0275eld"](3,0,null,null,1,"strong",[],null,null,null,null,null)),(l()(),t["\u0275ted"](4,null,["",""])),(l()(),t["\u0275ted"](5,null,["\xa0-\xa0Updated\xa0 ","\xa0"])),t["\u0275pid"](131072,i,[t.ChangeDetectorRef,t.NgZone]),(l()(),t["\u0275eld"](7,0,null,null,1,"a",[["style","cursor: pointer; color: #00a030"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.getGrahp(l.context.$implicit.node.name)&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["get Commits"])),(l()(),t["\u0275eld"](9,0,null,null,1,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),t["\u0275ted"](10,null,[" "," "])),(l()(),t["\u0275eld"](11,0,null,null,2,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,f)),t["\u0275did"](13,278528,null,0,a.k,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,13,0,n.context.$implicit.node.languages.edges)},function(l,n){l(n,4,0,n.context.$implicit.node.name),l(n,5,0,t["\u0275unv"](n,5,0,t["\u0275nov"](n,6).transform(n.context.$implicit.node.updatedAt))),l(n,10,0,n.context.$implicit.node.description)})}function g(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,5,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,4,"div",[["class","col-md-4 col-xs-4 text-center"],["style","padding-top: 5px;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,1,"button",[["class","btn btn-primary"],["style","margin-left: 5px;"]],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;return"click"===n&&(t=!1!==e.previous(e.repo)&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Previous"])),(l()(),t["\u0275eld"](4,0,null,null,1,"button",[["class","btn btn-primary"],["style","margin-left: 5px;"]],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;return"click"===n&&(t=!1!==e.next(e.repo)&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Next"]))],null,null)}function v(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,3,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,2,"div",[["class","col-md-4 col-xs-4 text-center"],["style","padding-top: 5px;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,1,"button",[["class","btn btn-primary"],["style","margin-left: 5px;"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.clear()&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Clear"]))],null,null)}function b(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,11,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,10,"div",[["class","col-md-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,9,"div",[["class","card"]],null,null,null,null,null)),(l()(),t["\u0275eld"](3,0,null,null,1,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,[" Commits "])),(l()(),t["\u0275eld"](5,0,null,null,6,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),t["\u0275eld"](6,0,null,null,1,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](7,0,null,null,0,"div",[["id","chart"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,g)),t["\u0275did"](9,16384,null,0,a.l,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,v)),t["\u0275did"](11,16384,null,0,a.l,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(l,n){var u=n.component;l(n,9,0,1==u.columns.length),l(n,11,0,u.columns.length>1)},null)}function y(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,17,"tr",[],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,2,"td",[["class","text-center"]],null,null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,1,"div",[["class","avatar"]],null,null,null,null,null)),(l()(),t["\u0275eld"](3,0,null,null,0,"img",[["alt","admin@bootstrapmaster.com"],["class","img-avatar"]],[[8,"src",4]],null,null,null,null)),(l()(),t["\u0275eld"](4,0,null,null,6,"td",[],null,null,null,null,null)),(l()(),t["\u0275eld"](5,0,null,null,2,"div",[],null,null,null,null,null)),(l()(),t["\u0275eld"](6,0,null,null,1,"a",[["style","color: black"]],[[8,"href",4]],null,null,null,null)),(l()(),t["\u0275ted"](7,null,["",""])),(l()(),t["\u0275eld"](8,0,null,null,2,"div",[["class","small text-muted"]],null,null,null,null,null)),(l()(),t["\u0275eld"](9,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),t["\u0275ted"](10,null,["",""])),(l()(),t["\u0275eld"](11,0,null,null,1,"td",[["class","text-center"]],null,null,null,null,null)),(l()(),t["\u0275ted"](12,null,[" "," "])),(l()(),t["\u0275eld"](13,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t["\u0275ted"](14,null,[" "," "])),(l()(),t["\u0275eld"](15,0,null,null,2,"td",[["class","text-center"]],null,null,null,null,null)),(l()(),t["\u0275ted"](16,null,[" "," "])),t["\u0275pid"](131072,i,[t.ChangeDetectorRef,t.NgZone])],null,function(l,n){l(n,3,0,t["\u0275inlineInterpolate"](1,"",n.context.$implicit.node.avatarUrl,"")),l(n,6,0,t["\u0275inlineInterpolate"](1,"",n.context.$implicit.node.url,"")),l(n,7,0,n.context.$implicit.node.login),l(n,10,0,n.context.$implicit.node.email),l(n,12,0,n.context.$implicit.node.name),l(n,14,0,n.context.$implicit.node.bio),l(n,16,0,t["\u0275unv"](n,16,0,t["\u0275nov"](n,17).transform(n.context.$implicit.node.createdAt)))})}function x(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,34,"div",[["class","animated fadeIn"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,9,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,8,"div",[["class","col-md-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](3,0,null,null,7,"div",[["class","card"]],null,null,null,null,null)),(l()(),t["\u0275eld"](4,0,null,null,1,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,[" Repositories "])),(l()(),t["\u0275eld"](6,0,null,null,4,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),t["\u0275eld"](7,0,null,null,2,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,h)),t["\u0275did"](9,278528,null,0,a.k,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),t["\u0275eld"](10,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,b)),t["\u0275did"](12,16384,null,0,a.l,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](13,0,null,null,21,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](14,0,null,null,20,"div",[["class","col-md-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](15,0,null,null,19,"div",[["class","card"]],null,null,null,null,null)),(l()(),t["\u0275eld"](16,0,null,null,1,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,[" Members "])),(l()(),t["\u0275eld"](18,0,null,null,16,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),t["\u0275eld"](19,0,null,null,15,"table",[["class","table table-responsive-sm table-hover table-outline mb-0"]],null,null,null,null,null)),(l()(),t["\u0275eld"](20,0,null,null,11,"thead",[["class","thead-light"]],null,null,null,null,null)),(l()(),t["\u0275eld"](21,0,null,null,10,"tr",[],null,null,null,null,null)),(l()(),t["\u0275eld"](22,0,null,null,1,"th",[["class","text-center"]],null,null,null,null,null)),(l()(),t["\u0275eld"](23,0,null,null,0,"i",[["class","icon-people"]],null,null,null,null,null)),(l()(),t["\u0275eld"](24,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["User"])),(l()(),t["\u0275eld"](26,0,null,null,1,"th",[["class","text-center"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Name"])),(l()(),t["\u0275eld"](28,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Bio"])),(l()(),t["\u0275eld"](30,0,null,null,1,"th",[["class","text-center"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Create at"])),(l()(),t["\u0275eld"](32,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,y)),t["\u0275did"](34,278528,null,0,a.k,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(l,n){var u=n.component;l(n,9,0,u.repositories),l(n,12,0,u.graph),l(n,34,0,u.members)},null)}var w=t["\u0275ccf"]("ng-component",c,function(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"ng-component",[],null,null,null,x,m)),t["\u0275did"](1,114688,null,0,c,[r.a,p.a],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),C=u("iutN"),I=u("gIcY"),R={title:"Team"},M=function(){},k=u("xdbM"),F=u("xtZt"),T=u("9EwZ"),$=u("w9aO");u.d(n,"TeamModuleNgFactory",function(){return N});var N=t["\u0275cmf"](e,[],function(l){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[o.a,w,C.a]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,I.p,I.p,[]),t["\u0275mpd"](4608,a.n,a.m,[t.LOCALE_ID,[2,a.v]]),t["\u0275mpd"](1073742336,I.m,I.m,[]),t["\u0275mpd"](1073742336,I.e,I.e,[]),t["\u0275mpd"](1073742336,p.p,p.p,[[2,p.v],[2,p.l]]),t["\u0275mpd"](1073742336,M,M,[]),t["\u0275mpd"](1073742336,k.ChartsModule,k.ChartsModule,[]),t["\u0275mpd"](1073742336,F.e,F.e,[]),t["\u0275mpd"](1073742336,T.a,T.a,[]),t["\u0275mpd"](1073742336,a.c,a.c,[]),t["\u0275mpd"](1073742336,$.a,$.a,[]),t["\u0275mpd"](1073742336,e,e,[]),t["\u0275mpd"](1024,p.j,function(){return[[{path:":slug",component:c,data:R}]]},[])])})}}]);