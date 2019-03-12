import React from "react";
import { Switch } from "react-router-dom";
import AuthenticatedRoute from './Components/AuthenticatedRoute';
import UnauthenticatedRoute from "./Components/UnauthenticatedRoute";
import Home from './Components/Home/Home';
import SSO from './Components/SSO/SSO';
import Loading from './Components/LoadingPage/Loading';
import Terms from './Components/Terms/Terms';
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Transactions from './Components/Transactions/Transactions';
import TransactionDetail from './Components/Transactions/TransactionDetails/TransactionDetail';
import AddUser from './Components/Admin/AccountDetails/Users/AddUser/AddUser';
import EditUser from './Components/Admin/AccountDetails/Users/EditUser/EditUser';
import Billing from './Components/Admin/Billing/Billing';
import BillingType from './Components/Admin/Billing/BillingType/BillingType';
import AccountDetails from './Components/Admin/AccountDetails/AccountDetails';
import RouteWidget from './Components/ShopifyWidget/RouteWidget';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';

export default ({childProps}) => (
  <Switch>
    {/* <UnauthenticatedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/sso" exact component={SSO} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <UnauthenticatedRoute path="/forgot-password" exact component={ForgotPassword} props={childProps} /> */}
    <AuthenticatedRoute path="/loading" exact component={Loading} props={childProps} />
    <AuthenticatedRoute path="/terms" component={Terms} props={childProps} />
    <AuthenticatedRoute path="/dashboard" component={Dashboard} props={childProps} />
    <AuthenticatedRoute path='/transactions' component={Transactions} props={childProps}/>
    <AuthenticatedRoute path='/transactiondetail/:id' component={TransactionDetail} props={childProps}/>
    <AuthenticatedRoute path='/accountdetails' component={AccountDetails} props={childProps}/>
    <AuthenticatedRoute path='/adduser' component={AddUser} props={childProps}/>
    <AuthenticatedRoute path='/edituser/:id' component={EditUser} props={childProps}/>
    <AuthenticatedRoute path='/billing' component={Billing} props={childProps}/>
    <AuthenticatedRoute path='/billingtype' component={BillingType} props={childProps}/>
    <AuthenticatedRoute path='/shopify/widget' component={RouteWidget} props={childProps}/>
  </Switch>
);
