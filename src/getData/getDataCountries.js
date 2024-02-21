import axios from "axios";
import { error, loaded, loading } from "../features/countries.scile";

export async function getCountries(url, dispatch) {
    dispatch(loading())
    await axios.get(url)
        .then((res) => dispatch(loaded(res.data)))
        .catch((err) => dispatch(error()))
}