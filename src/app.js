import { Builder, By, Key, until } from "selenium-webdriver";

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    async function waitForTitleToChange(title) {
      await driver.wait(until.titleIs(title), 3000);
    }

    await driver.get("http://www.flipkart.com");
    await waitForTitleToChange(
      "Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!"
    );
    await (await driver.findElement(By.css("._2AkmmA._29YdH8"))).click(); // close login

    await driver.findElement(By.name("q")).sendKeys("iphone", Key.RETURN);
    await waitForTitleToChange(
      "Iphone - Buy Products Online at Best Price in India - All Categories | Flipkart.com"
    );

    await (await driver.findElement(By.css("._3XS1AH._32ZSYo"))).click(); // Mobile category
    await waitForTitleToChange(
      "Mobile Price List | Compare Mobiles and Buy Online @ Flipkart"
    );

    await (await driver.findElement(By.css("._1qKb_B select"))).sendKeys(
      30000,
      Key.RETURN
    ); // Mobile price

    // ? throws error on uncommenting
    //? StaleElementReferenceError: stale element reference: element is not attached to the page document

    // await (await driver.findElement(By.css(".D_NGuZ._1KDdN8"))).click(); // f assured
    // await driver.wait(until.urlContains("Flipkart%2BAssured"), 2000);

    let products = await driver.findElements(By.className("_1UoZlX"));

    let a = products.map(async (product) => {
      return {
        tkid: await product.getAttribute("data-tkid"),
        title: await (
          await product.findElement(By.className("_3wU53n"))
        ).getText(),
        link: await (
          await product.findElement(By.className("_31qSD5"))
        ).getAttribute("href"),
        price: await (
          await product.findElement(By.css("._1vC4OE._2rQ-NK"))
        ).getText(),
      };
    });
    console.log(await Promise.all(a));
  } finally {
    await driver.quit();
  }
})();
