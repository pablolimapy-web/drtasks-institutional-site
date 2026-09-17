  assert.equal(nextFluxStep(0, 4), 1);
  assert.equal(nextFluxStep(3, 4), 0);
});

  assert.equal(nextFluxStep(2, 0), 0);
});

});

test("FluxOS stages expose selectable OS records with the operational context promised by the site", () => {
  for (const stage of fluxDemoStages) {
    assert.ok(Array.isArray(stage.orders));
    assert.ok(stage.orders.length >= 2);

    for (const order of stage.orders) {
      assert.ok(order.id.length > 0);
      assert.ok(order.title.length > 0);
      assert.ok(order.responsible.length > 0);
      assert.ok(order.deadline.length > 0);
      assert.ok(order.status.length > 0);
      assert.ok(order.nextAction.length > 0);
      assert.ok(order.lastMovement.length > 0);
      assert.equal(typeof order.blocker, "string");
      assert.equal(typeof order.risk, "boolean");
    }
  }
});
