Feature: Demo feature
    #@demo
    Scenario Outline: Running first demo feature
        Given Google page is opened
        When Search with <SearchItem>
        Then Click on the first search result
        Then Url should match <ExpectedURL>

        Examples:
            | TestID     | SearchItem | ExpectedURL           |
            | DEMO_TC001 | WDIO      | https://webdriver.io/es/ |