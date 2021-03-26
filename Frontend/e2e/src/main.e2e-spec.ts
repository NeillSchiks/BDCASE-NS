import { MainPo } from "./main.po";

describe('Test upload form', () => {
  let main: MainPo;

  beforeEach(async () => {
    main = new MainPo();
    await main.navigateTo();
  });

  it('should upload', async () => {
    const before = await main.getViewModel() + 1;

    await main.inputFile();
    await main.submitForm();

    const after = await main.getViewModel();

    expect(before).toBe(after);
  })
  
});
