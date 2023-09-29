import React, { useEffect, useState } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";
import { useSelector, useDispatch } from "react-redux";
import { StoicIdentity } from "ic-stoic-identity";
import { Route, Routes, useLocation } from "react-router-dom";

export default StoicIdentity;
export const alright = "ok";
