import "@testing-library/jest-dom";

import { server } from "./sundaesOnDemand/mocks/server"

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())