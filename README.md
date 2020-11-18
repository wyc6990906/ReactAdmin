# day01

## 1. Project development preparation

1) . Describe the project  

2) . Technical selection  

3) . API interface/interface document/test interface  

 

## 2. Start project development

1) . Create a project with react scaffolding  

2) . Development environment running: npm start  

3) . Package and run in production environment: npm run build serve build  

 

## 3. git management project

1) . Create a remote warehouse  

2) . Create a local warehouse  

Configure .gitignore
git init
git add.
git commit -m "init"
3) . Push local warehouse to remote warehouse  

git remote add origin url

git push origin master

4) . Create a dev branch locally and push to the remote  

git checkout -b dev

git push origin dev

5) . If there are changes locally  

git add.

git commit -m "xxx"

git push origin dev

6) . New colleague: clone warehouse  

git clone url

git checkout -b dev origin/dev

git pull origin dev

7) . If remote modification  

git pull origin dev

 

## 4. Create the basic structure of the project

api: the module requested by ajax

components: non-routed components

pages: routing components

App.js: The root component of the application

index.js: entry js

 

## 5 Introduce antd

Download antd package

On-demand packaging: only package js/css imported into components

Download toolkit

config-overrides.js

package.json

Custom theme

Download toolkit

config-overrides.js

Use antd components

According to the antd documentation

 

## 6. Import routes

Download package: react-router-dom

Split application routing:

Login: Login

Admin: background management interface

Register routing:

<BrowserRouter>

<Switch>

<Route path='' component={}/>

 

## 7. Static component of Login

1) . Customized a part of the style layout  

2) . Use antd components to implement the login form interface  

Form / Form.Item

Input

Icon

Button

 

## 8. Collect form data and front-end validation of the form

1) . Form object  

How to make the component containing <Form> get the form object? WrapLoginForm = Form.create()(LoginForm)

WrapLoginForm is the parent component of LoginForm, it passes form attributes to LoginForm

Techniques using higher-order functions and higher-order components

2) . Manipulate form data  

form.getFieldDecorator('Identification name', (initialValue: initial value, rules: []})(<Input/>) package form item component label

form.getFieldsValue(): Get an object containing all input data

form.getFieldValue(id): Get the data entered in the corresponding field according to the identifier

 

3) . Front-end form validation  

Declarative real-time form validation:
form.getFieldDecorator('Identification name', {rules: [{min: 4, message:'Error prompt message'}]))(<Input/>)

Custom form validation
form.getFieldDecorator('Identification Name', {rules: [{validator: this.validatePwd}]})(<Input/>)

validatePwd = (rule, value, callback) => {

if(problem) callback('error message') else callack()

}

Unified verification when prompted
form.validateFields((error, values) => {

if(!error) {Pass the verification, send an ajax request}

})

 

## 9. Higher-order functions and higher-order components

Higher order function
1) . A special function  

Accept function type parameters
The return value is a function
2) . Common  

Timer: setTimeout()/setInterval()
Promise: Promise(() => {}) then(value => {}, reason => {})
Array traversal related methods: forEach()/filter()/map()/reduce()/find()/findIndex()
Bind() of the function object
Form.create()() / getFieldDecorator()()
3) . Higher-order function update dynamics, more scalable  

 

High-end components
1) . The essence is a function  

2) . Receive a component (packaged component), return a new component (packaged component), the packaged component will pass specific attributes to the packaged component  

3) . Function: extend the function of the component  

 

The relationship between higher-order components and higher-order functions
Higher-order components are special higher-order functions

Receive a component function, and return a new component function

 

# day02

## 1. Background application

Start background application: mongodb service must be started

Use postman to test the interface (according to the interface documentation):

Access test: The parameters of the post request are set in the body

Save test interface

Export/import all test interfaces

 

## 2. Write ajax code

1) . Ajax request function module: api/ajax.js  

Encapsulate axios + Promise

The return value of the function is the promise object ===> Use async/await later

Create Promise yourself

Internal unified handling of request exceptions: external calls do not need to use try..catch to handle request exceptions
The asynchronous return is the response data (not the response object): the external call asynchronously gets the data directly (response --> response.data)
2) . Interface request function module: api/index.js  

Write according to the interface document (must have this ability)

Interface request function: use ajax(), return value promise object

3) . Solve the ajax cross-domain request problem (during development)  

Method: Configure proxy ==> can only solve the development environment

Encoding: package.json: proxy: "http://localhost:5000"

4) . Understanding of the agency  

1) What is it?  

Programs with specific functions

2) . Where is it running?  

Foreground application

Can only be used during development

3) . What?  

Solve the cross-domain problem of ajax requests during development

Monitor and intercept requests (3000)
Forward request (4000)
4) . Configure proxy  

Tell the proxy server some information: such as the forwarding destination address

Development environment: front-end engineer

Production environment: back-end engineer

5) . Async and await  

effect?
Simplify the use of promise objects: no longer use then() to specify success/failure callback functions

Implement asynchronous processes in synchronous coding (no callback function)

Where to write await?
Write await on the left side of the expression that returns promise: Don't want promise, want the value data of successful asynchronous execution of promise

Where to write async?
Write async on the left side of the definition of the function (recent) where await is located

 

## 3. Realize login (including automatic login)

login.jsx

1) . Call the login interface request  

2) . If it fails, an error message will be displayed  

3) . If successful:  

Save user to local/memory

Jump to admin

4) . If the user in the memory has a value, it will automatically jump to admin  

src/index.js

Read the user in local to the memory to save

admin.jsx

Determine if there is no user in the memory (_id has no value), automatically jump to login

storageUtils.js

Contains tool modules that use localStorage to save user-related operations

Use the third store

Simplify coding

Compatible with different browsers

memoryUtils.js

Tools used to store data (user) in memory

 

## 4. Build the overall interface structure of admin

1) . The overall layout uses the Layout component of antd  

2) . Split components  

LeftNav: left navigation

Header: right head

3) . Sub-route  

Define routing components

Register route

 

## 5. LeftNav component

1) . Use antd components  

Menu / Item / SubMenu

 

2) . Use react-router  

withRouter(): Wrap non-routed components and pass history/location/match attributes to them

history: push()/replace()/goBack()

location: pathname attribute

match: params attribute

 

3) Comparison of componentWillMount and componentDidMount  

componentWillMount: Called once before the first render() to prepare data for the first render() (synchronization)

componentDidMount: Called once after the first render() to start the asynchronous task, and then asynchronously update the status and re-render

 

4) . Generate an array of Item and SubMenu based on the dynamic  

map() + recursion: multi-level menu list

reduce() + recursion: multi-level menu list

 

5) . 2 questions?  

How to select the corresponding menu item when refreshing?

selectedKey is the currently requested path

When refreshing the submenu path, automatically open the submenu list?

openKey is a submenu item of the first-level list item is the current corresponding menu item

 

# day03

 

## 1. Header component

1) . Static interface layout  

Triangle effect

2) . Get the name display of the logged in user  

MemoryUtils

3) . Current time  

Cycle timer, update current time status every 1s

Format the specified time: dateUtils

4) . Weather forecast  

Use jsonp library to send jsonp request Baidu weather forecast interface

Understanding of jsonp requests

5) . Title of the current navigation item  

Get the routing path of the current request: withRouter() wraps non-routing components

Traverse the menuList according to the path to find the title of the corresponding item

6) . Logout  

Modal component display prompt

Clear saved user

Jump to login

7) . Extract generic link button components  

Pass all received properties through...: <Button {...props} /> <LinkButton>xxxx</LinkButton>

All child nodes of the component label will become the children attribute of the component

 

## 2. jsonp solves the principle of ajax cross-domain

1) . Jsonp can only solve the cross-domain problem of GET type ajax requests  

2) . Jsonp request is not an ajax request, but a general get request  

3) . Basic Principles  

Browser side:

Dynamically generate <script> to request the background interface (src is the url of the interface)

Define the function (fn) used to receive the response data, and submit the function name to the background through the request parameters (such as: callback=fn)

Service-Terminal:

After receiving the request processing to produce the result data, return the js code of a function call, and pass the result data as the actual parameter to the function call

Browser side:

After receiving the js code that automatically executes the function call in response, the callback function defined in advance is executed, and the required result data is obtained

 

# day04: Category component

 

## 1. Use the antd component to build a category list interface

Card

Table

Button

Icon

 

## 2. Related interface request functions

Get a list of primary/secondary categories

add category

Update classification

 

## 3. Asynchronous display of the first level category list

Design the status of the first-level category list: categories

Asynchronously obtain the first-level category list: componentDidMount()()

Update status, display

 

## 4. Display the list of secondary categories

Design status: subCategorys / parentId / parentName

Display the secondary category list: According to the parentId status value, asynchronously obtain the category list

The problem with setState()

setState() Update state is updated asynchronously, read state value directly or old state value

setState({}, [callback]), the callback function is executed after the state is updated and the interface is updated, you can get the latest state here

 

## 5. Update classification

1) . Interface  

antd components: Modal, Form, Input

Show/hide: showStatus status is 2/0

 

2) . Function  

The parent group (Category) gets the data (form) of the child component (AddForm)

Call the interface to update the classification

Re-acquire the category list

 

 

# day05

 

## 1. Add category

1) . Interface  

antd components: Modal, Form, Select, Input

Show/hide: showStatus status is 1/0

 

2) . Function  

The parent group (Category) gets the data (form) of the child component (AddForm)

Call the interface for adding categories

Re-acquire the category list

 

## 2. Product overall routing

1) . Configure sub-routes:  

ProductHome / ProductDetail / ProductAddUpdate

<Route> / <Switch> / <Redirect>

 

2) . The logic of matching routing:  

Default: Match layer by layer <Route path='/product' component={ProductHome}/>

exact attribute: exact match

 

## 3. Paging implementation technology (2 types)

1) . Front page paging  

Request to get data: Get all the data at once, no need to send a request when turning the page

Request interface:

No need to specify request parameters: page number (pageNum) and number per page (pageSize)

Response data: array of all data

 

2) . Paging based on background  

Request for data: each time you only get the data of the current page, you need to send a request when you turn the page

Request interface:

Need to specify request parameters: page number (pageNum) and number of pages (pageSize)

Response data: array of current page data + total number of records (total)

 

3) . How to choose?  

Basically choose according to the amount of data

 

## 4. ProductHome component

1) . Paging display  

Interface: <Card> / <Table> / Select / Icon / Input / Button

Status: products / total

Data required by the interface request function: pageNum, pageSize

Get the first page data display asynchronously

Call the paging interface request function, get the products and total records total of the current page

Update status: products / total

Turn page:

Binding the monitor of page turning, the monitor callback needs to get pageNum

Asynchronously obtain the data display of the specified page number

 

2) . Search tab  

Data required by the interface request function:

pageSize: the number of entries per page

pageNum: The current request page (starting from 1)

productDesc / productName: searchName Search by product description/name

Status: searchType / searchName / collect data in real time during user operation

Asynchronous search displays a paged list

If searchName has a value, call the search interface request function to obtain data and update the status

 

3) . Update the status of the product  

Initial display: According to the status attribute of product to display status = 1/2

Click to switch:

Bind click listener

Asynchronous request update status

 

4) . Enter the details interface  

history.push('/product/detail', {product})

 

5) . Enter the add interface  

history.push('/product/addupdate')

 

## 5. ProductDetail component

1) . Read product data: this.props.location.state.product  

2) . Show product information: <Card> / List  

3) . Asynchronously display the name of the product category  

pCategoryId==0: Get the category name of categoryId asynchronously

pCategoryId!=0: Get the category name of pCategoryId/categoryId asynchronously

4) . Promise.all([promise1, promise2])  

The return value is a promise

The asynchronous result is an array of all promsie results

Features: Send multiple requests at a time, only when all the requests are successful, will they succeed, and get the successful data, once one fails, the whole will fail

 

# day06

## 1. ProductAddUpdate

1) . Basic interface  

Card / Form / Input / TextArea / Button

Label title and layout of FormItem

 

2) . Cascading list of categories  

Basic use of Cascader

Get the first-level category list asynchronously, and generate the first-level category options

If you are currently updating a product in the secondary category, asynchronously obtain the corresponding secondary category list, generate secondary category options, and add them as children of the corresponding option

The return value of the async function is a new promise object, and the result and value of the promise are determined by the result of the async function

When selecting a first-level classification item, asynchronously obtain the corresponding second-level classification list, generate the second-level classification options, and add them as children of the current option

 

3) . Form data collection and form validation  

 

## 2. PicturesWall

1) . Antd component  

Upload / Modal / Icon

Based on the demo demo

2) . Upload pictures  

Configure the interface path and request parameter name on <Upload>

Monitor file status changes: uploading / uploading completed / deleted

When the upload is successful, save the relevant information: name / url

Provide a method for the parent component to obtain an array of uploaded image file names

3) . Delete picture  

When the file status changes to delete, call the delete picture interface to delete the picture uploaded to the background

4) . The method of the parent component calling the child component object: using ref technology  

Create ref container: thi.pw = React.createRef()
Give the ref container to the label element that needs to be obtained: <PicturesWall ref={this.pw} /> // automatically add the label object as the current attribute of the pw object
Read label elements through ref container: this.pw.current
 

# day07

 

## 1. RichTextEditor

1) . Use React-based rich text programmer plug-in library: react-draft-wysiwyg  

2) . Reference library DEMO and API documentation  

3) . If there is still uncertainty, Baidu search, specify relatively accurate keywords  

 

## 2. Complete product addition and modification functions

1) . Collect input data  

Collect via form: name/desc/price/pCategoryId/categoryId

Collected by ref: imgs/detail

If it is an update collection: _id

Encapsulate the collected data into product objects

2) . Update products  

Define the interface request function for adding and updating

Call the interface request function, if successful, return to the product list interface

 

## 3. Role Management

1) . Role front page display  

2) . Add roles  

3) . Authorize the specified role  

Interface: Tree

Status: checkedKeys, initialized according to the menus of the incoming role

When you check a Node, update checkedKeys

When you click OK: Read the checkedKeys in the child component through ref as the new menus to update the product

Send request to update product

Solve the bug that the default check is abnormal: use the componentWillReceiveProps() of the component

 

# day08

 

## 1. Use of setState()

1) . SetState(updater, [callback]),  

updater is a function that returns a stateChange object: (state, props) => stateChange

The received state and props are guaranteed to be the latest

2) . SetState(stateChange, [callback])  

stateChange is an object,

callback is an optional callback function, executed after the status is updated and the interface is updated

3) . Summary:  

Object mode is shorthand for function mode

If the new state does not depend on the original state ===> use the object method

If the new state depends on the original state ===> use the function method

If you need to get the latest state data after setState(), read it in the second callback function

 

## 2. Asynchronous and synchronous of setState()

1) . Is the update state of setState() asynchronous or synchronous?  

Where to execute setState()?
In the callback function controlled by react: life cycle hook/react event listener callback

In asynchronous callback functions that are not controlled by react: timer callback/ native event listener callback/ promise callback/...

Asynchronous OR synchronous?
React related callbacks: asynchronous

Among other asynchronous callbacks: synchronous

 

2) . About asynchronous setState()  

How to deal with multiple calls?
setState(()): merge and update the state once, only call render() once to update the interface---state update and interface update are merged

setState(fn): Update the state multiple times, but only call render() once to update the interface --- the state update is not merged, but the interface update is merged

How to get the status data after asynchronous update?
In the callback function of setState()

 

## 3. Component and PureComponent

1) . What is the problem with Component?  

If the parent component re-render(), the current component will re-execute render() even if there is no change
The current component setState(), re-execute render(), even if there is no change in state
 

2) . Solve the problems of Component  

Reason: The component's shouldcomponentUpdate() returns true by default, and render() will be executed again even if the data does not change
Method 1: Rewrite shouldComponentUpdate(), and return true if the data changes, otherwise return false
Method 2: Use PureComponent instead of Component
Description: Generally, PureComponent is used to optimize component performance
 

3) . The basic principle of PureComponent  

Rewrite implementation shouldComponentUpdate()
Perform a shallow comparison between the new/old state of the component and the data in props, if there is no change, return false, otherwise return true
Once componentShouldUpdate() returns false, render() for update is no longer executed
 

4) . Interview questions:  

Which life cycle hook of the component can achieve component optimization?

The principle of PureComponent?

What is the difference between Component and PureComponent?

 

## 4. User Management

1) . Display the user page list  

2) . Add users  

3) . Modify user  

4) . Delete user  

 

## 5. Navigation menu permission control

1) . Basic ideas (depending on the background):  

Role: An array containing the keys of all menu items with permissions: menus=[key1, key2, key3]

User: contains the ID of the role: role_id

Currently logged in user: user already contains the role object

When traversing the display menu items: It is judged that it will only be displayed when there is a corresponding permission

2) . To determine whether there is a permission condition?  

If the current user is admin
If the current item is public
The current user has the permission of this item: Is the key in menus?
If the current user has the permission of a child item of this item
 

# day09

## 1. Redux understanding

What?: redux is an independent third-party library that specializes in state management, not a react plugin, but it is generally used in react projects

Role?: Centralized management of the state in the application (write/read)

Development: use with react-redux, redux-thunk and other plugins

 

## 2. redux related API

Redux contains: createStore(), applyMiddleware(), combineReducers()

store object: getState(), dispatch(), subscribe()

react-redux:

<Provider store=(store)>: Provide store to all container components

connect(

state => ({xxx: state.xxx}),

{actionCreator1, actionCreator2}

) (UI component):

What is produced is the container component, which is responsible for passing label attributes to the UI component.

The general attribute value is obtained from the state, and the dispatch is executed inside the function attribute.

 

## 3. Redux core concepts (3)

action:

The default is an object (synchronous action), (type:'xxx', data: value), which needs to be generated by the corresponding actionCreator,

Its value can also be a function (asynchronous action), you need to introduce redux-thunk.

reducer

According to the old state and the specified action, return a new state

Cannot modify the old state

store

The core management object of redux

Internal management: state and reducer

Provide methods: getState(), dispatch(action), subscribe(listener)

 

## 4. Redux workflow

![](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016091802.jpg)

 

## 5. Use redux and related library coding

Need to import libraries:

redux

react-redux

redux-thunk

redux-devtools-extension (this is only needed during development)

redux folder:

action-types.js

actions.js

reducers.js

store.js

The components are divided into 2 categories:

ui components: do not use redux related APIs

Container components (containers): components generated by connect()()

 

# day10

## 1. Set up the entire redux environment in the project

1) . Store.js  

2) . Reducer.js  

3) . Actions.js  

4) . Action-types.js  

5) . Index.js  

6) . Create container components in UI components that need to communicate (read/write) state data with redux  

 

## 2. Manage the headTitle data through redux

1) . Action-types.js  

2) . Actoins.js  

3) . Reducer.js  

4) . Related components:  

left-nav.js

header.js

 

## 3. Manage login user information user data through redux

1) . Action-types.js  

2) . Actoin.js  

3) . Reducer.js  

4) . Related components:  

login.js

admin.js

left-nav.js

header.js

role.js

 

## 4. Custom redux library

1) . The redux library exposes the following functions  

createStore(): The parameter received is the reducer function, and the return is the store object

combineReducers(): Receive an object containing n reducer methods and return a new reducer function

applyMiddleware() // not implemented yet

 

2) The internal structure of the store object  

getState(): The return value is the state data stored internally

dispatch(): The parameter is the action object

subscribe(): The parameter is a callback function that monitors internal state updates

 

3) . CombineReducers function:  

The total reducer function returned will be based on the total state and the specified action.

Call each reducer function to get the corresponding new state, and encapsulate it into a new total state object to return

 

## 5. Custom react-redux library

1) . react-redux exposes 2 APIs  

Provider component class
connect function
 

2) . Provider component  

Receive store attributes

Expose store to all container subcomponents through context

Provider renders all its label child nodes as they are

 

3) . Connect function  

Receive 2 parameters: mapStateToProps and mapDispatchToProps

The return value of connect() is a high-level component: wrap UI components and return a new container component

mapStateToProps:

As a function, returns an object containing n general attributes,

After the object is called in the container component, it is initialized to the initial state of the container component and specified as the general attribute of the UI component label

mapDispatchToProps:

If it is a function, call an object containing n dispatch methods

If it is an object, the traversal is encapsulated into an object containing n dispatch methods

Pass objects containing n dispatch methods as function attributes to UI components

Binding state changes through the store, update the state of the container component according to the latest state data in the store in the callback function, thereby updating the UI component

 

# day11

## 1. Data visualization

1) . Echarts(Baidu) ==> echarts-for-react  

2) . G2(Ali) ==> bizCharts  

3) . D3 (foreign)  

 

## 2. Front 404 interface

<Redirect from='/' to='/home' exact/>

<Route component={NotFound}/>

 

## 3. Packaged application operation

1) . Solve the cross-domain problem of ajax in production environment  

Use nginx reverse proxy solution (generally configured by the background)

CORS: Allow browser-side cross-domain

2) The problem of refreshing 404 in BrowserRouter mode  

Problem: When refreshing a certain routing path, a 404 error will appear
Reason: The path path after the project root path will be used as the background routing path to request the corresponding background routing, but there is no
Solution: Use custom middleware to read and return to index page display
 

 